import argon2 from "argon2";
import crypto from "crypto";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import { sendResetEmail } from "../utils/mailer.utils";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXP = process.env.ACCESS_TOKEN_EXPIRY || "15m";
const REFRESH_EXP_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS || 7);
const RESET_TOKEN_EXP_MIN = Number(process.env.RESET_TOKEN_EXPIRY_MINUTES || 60);
const APP_URL = process.env.APP_URL || "http://localhost:4000";

function signAccessToken(userId: string) {
    return jwt.sign({ id: userId }, ACCESS_SECRET, { expiresIn: "3h" });
}
function signRefreshToken(userId: string) {
    return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: "6h" });
}

export const AuthService = {
    async signup(email: string, password: string, name: string) {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw new Error("User already exists");

        const passwordHash = await argon2.hash(password);
        const user = await prisma.user.create({ data: { email, passwordHash, name } });

        const accessToken = signAccessToken(user.id);
        const refreshToken = signRefreshToken(user.id);
        const refreshExpiry = dayjs().add(REFRESH_EXP_DAYS, "day").toDate();

        await prisma.refreshToken.create({
            data: { token: refreshToken, userId: user.id, expiresAt: refreshExpiry },
        });

        return { user, accessToken, refreshToken };
    },

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid credentials");

        const ok = await argon2.verify(user.passwordHash, password);
        if (!ok) throw new Error("Invalid credentials");

        const accessToken = signAccessToken(user.id);
        const refreshToken = signRefreshToken(user.id);
        const refreshExpiry = dayjs().add(REFRESH_EXP_DAYS, "day").toDate();

        await prisma.refreshToken.create({
            data: { token: refreshToken, userId: user.id, expiresAt: refreshExpiry },
        });

        return { user, accessToken, refreshToken };
    },


    async refresh(oldToken: string) {
        const stored = await prisma.refreshToken.findUnique({
            where: { token: oldToken },
        });

        if (!stored || stored.revoked) {
            throw new Error("Invalid refresh token");
        }

        if (new Date(stored.expiresAt) < new Date()) {
            throw new Error("Refresh token expired");
        }

        // Verify signature & extract payload
        const payload = jwt.verify(oldToken, REFRESH_SECRET) as { id: string };

        // ✅ Ensure this is the *latest* token for the user
        const latest = await prisma.refreshToken.findFirst({
            where: { userId: payload.id, revoked: false },
            orderBy: { createdAt: "desc" },
        });

        if (!latest || latest.token !== oldToken) {
            throw new Error("Not the latest refresh token");
        }

        // Revoke the old one
        await prisma.refreshToken.update({
            where: { token: oldToken },
            data: { revoked: true },
        });

        // Issue new refresh token
        const newRefresh = signRefreshToken(payload.id);
        const refreshExpiry = dayjs().add(REFRESH_EXP_DAYS, "day").toDate();

        await prisma.refreshToken.create({
            data: {
                token: newRefresh,
                userId: payload.id,
                expiresAt: refreshExpiry,
            },
        });

        // Issue new access token
        const newAccess = signAccessToken(payload.id);

        return { accessToken: newAccess, refreshToken: newRefresh };
    },

    async logout(token: string) {
        await prisma.refreshToken.updateMany({ where: { token }, data: { revoked: true } });
    },

    async requestPasswordReset(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return;

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = dayjs().add(RESET_TOKEN_EXP_MIN, "minute").toDate();

        await prisma.resetToken.create({ data: { token, userId: user.id, expiresAt } });

        const resetUrl = `${APP_URL}/reset-password?token=${token}&id=${user.id}`;
        // emails in prod run in the background
        await sendResetEmail(user.email, resetUrl);
    },

    async resetPassword(token: string, password: string) {
        const rt = await prisma.resetToken.findUnique({ where: { token } });
        if (!rt || rt.used || new Date(rt.expiresAt) < new Date()) {
            throw new Error("Invalid or expired reset token");
        }

        const passwordHash = await argon2.hash(password);
        await prisma.user.update({ where: { id: rt.userId }, data: { passwordHash } });
        await prisma.resetToken.update({ where: { token }, data: { used: true } });
    },
};
