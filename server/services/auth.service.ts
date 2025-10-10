import argon2 from "argon2";
import crypto from "crypto";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

import {
  ACCESS_SECRET,
  APP_URL,
  REFRESH_EXP_DAYS,
  REFRESH_SECRET,
  RESET_TOKEN_EXP_MIN,
} from "../config";

import { sendResetEmail } from "../utils/mailer.utils";
import { signAccessToken, signRefreshToken } from "../utils/auth.utils";

import { UserRepository } from "../repository/user.repository";
import { RefreshTokenRepository } from "../repository/refresh.token.repository";
import { ResetTokenRepository } from "../repository/reset.token.repository";

const userRepo = new UserRepository();
const refreshRepo = new RefreshTokenRepository();
const resetRepo = new ResetTokenRepository();

export const AuthService = {
  async signup(email: string, password: string, name: string) {
    const existing = await userRepo.getUserByEmail(email);
    if (existing) throw new Error("User already exists");

    const passwordHash = await argon2.hash(password);
    const user = await userRepo.createUser(email, passwordHash, name);

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    const refreshExpiry = dayjs().add(REFRESH_EXP_DAYS, "day").toDate();

    await refreshRepo.createToken(user.id, refreshToken, refreshExpiry);

    return { user, accessToken, refreshToken };
  },

  async login(email: string, password: string) {
    const user = await userRepo.getUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const ok = await argon2.verify(user.password, password);
    if (!ok) throw new Error("Invalid credentials");

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    const refreshExpiry = dayjs().add(REFRESH_EXP_DAYS, "day").toDate();

    await refreshRepo.createToken(user.id, refreshToken, refreshExpiry);

    return { user, accessToken, refreshToken };
  },

  async refresh(oldToken: string) {
    const stored = await refreshRepo.getToken(oldToken);

    if (!stored || stored.revoked) throw new Error("Invalid refresh token");
    if (new Date(stored.expiresAt) < new Date()) throw new Error("Refresh token expired");

    const payload = jwt.verify(oldToken, REFRESH_SECRET) as { id: string };

    const latest = await refreshRepo.getLatestActiveToken(payload.id);
    if (!latest || latest.token !== oldToken) {
      throw new Error("Not the latest refresh token");
    }

    await refreshRepo.revokeToken(stored.id);

    const newRefresh = signRefreshToken(payload.id);
    const refreshExpiry = dayjs().add(REFRESH_EXP_DAYS, "day").toDate();

    await refreshRepo.createToken(payload.id, newRefresh, refreshExpiry);
    const newAccess = signAccessToken(payload.id);

    return { accessToken: newAccess, refreshToken: newRefresh };
  },

  async logout(token: string) {
    await refreshRepo.revokeByToken(token);
  },

  async requestPasswordReset(email: string) {
    const user = await userRepo.getUserByEmail(email);
    if (!user) return;

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = dayjs().add(RESET_TOKEN_EXP_MIN, "minute").toDate();

    await resetRepo.createToken(user.id, token, expiresAt);

    const resetUrl = `${APP_URL}/reset-password?token=${token}&id=${user.id}`;
    await sendResetEmail(user.email, resetUrl);
  },

  async resetPassword(token: string, password: string) {
    const rt = await resetRepo.getToken(token);
    if (!rt || rt.used || new Date(rt.expiresAt) < new Date()) {
      throw new Error("Invalid or expired reset token");
    }

    const passwordHash = await argon2.hash(password);
    await userRepo.updateUser(rt.userId, { password:passwordHash });
    await resetRepo.markAsUsed(rt.id);
  },

  async getCurrentUser(token: string) {
    try {
      const payload = jwt.verify(token, ACCESS_SECRET) as { id: string };
      const user = await userRepo.getUserById(payload.id);

      if (!user) throw new Error("User not found");

      const { password, ...safeUser } = user;
      return safeUser;
    } catch (err) {
      throw new Error("Invalid or expired access token");
    }
  },
};
