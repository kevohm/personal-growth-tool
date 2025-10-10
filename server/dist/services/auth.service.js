"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const argon2_1 = __importDefault(require("argon2"));
const crypto_1 = __importDefault(require("crypto"));
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const mailer_utils_1 = require("../utils/mailer.utils");
const auth_utils_1 = require("../utils/auth.utils");
const user_repository_1 = require("../repository/user.repository");
const refresh_token_repository_1 = require("../repository/refresh.token.repository");
const reset_token_repository_1 = require("../repository/reset.token.repository");
const userRepo = new user_repository_1.UserRepository();
const refreshRepo = new refresh_token_repository_1.RefreshTokenRepository();
const resetRepo = new reset_token_repository_1.ResetTokenRepository();
exports.AuthService = {
    async signup(email, password, name) {
        const existing = await userRepo.getUserByEmail(email);
        if (existing)
            throw new Error("User already exists");
        const passwordHash = await argon2_1.default.hash(password);
        const user = await userRepo.createUser(email, passwordHash, name);
        const accessToken = (0, auth_utils_1.signAccessToken)(user.id);
        const refreshToken = (0, auth_utils_1.signRefreshToken)(user.id);
        const refreshExpiry = (0, dayjs_1.default)().add(config_1.REFRESH_EXP_DAYS, "day").toDate();
        await refreshRepo.createToken(user.id, refreshToken, refreshExpiry);
        return { user, accessToken, refreshToken };
    },
    async login(email, password) {
        const user = await userRepo.getUserByEmail(email);
        if (!user)
            throw new Error("Invalid credentials");
        const ok = await argon2_1.default.verify(user.password, password);
        if (!ok)
            throw new Error("Invalid credentials");
        const accessToken = (0, auth_utils_1.signAccessToken)(user.id);
        const refreshToken = (0, auth_utils_1.signRefreshToken)(user.id);
        const refreshExpiry = (0, dayjs_1.default)().add(config_1.REFRESH_EXP_DAYS, "day").toDate();
        await refreshRepo.createToken(user.id, refreshToken, refreshExpiry);
        return { user, accessToken, refreshToken };
    },
    async refresh(oldToken) {
        const stored = await refreshRepo.getToken(oldToken);
        if (!stored || stored.revoked)
            throw new Error("Invalid refresh token");
        if (new Date(stored.expiresAt) < new Date())
            throw new Error("Refresh token expired");
        const payload = jsonwebtoken_1.default.verify(oldToken, config_1.REFRESH_SECRET);
        const latest = await refreshRepo.getLatestActiveToken(payload.id);
        if (!latest || latest.token !== oldToken) {
            throw new Error("Not the latest refresh token");
        }
        await refreshRepo.revokeToken(stored.id);
        const newRefresh = (0, auth_utils_1.signRefreshToken)(payload.id);
        const refreshExpiry = (0, dayjs_1.default)().add(config_1.REFRESH_EXP_DAYS, "day").toDate();
        await refreshRepo.createToken(payload.id, newRefresh, refreshExpiry);
        const newAccess = (0, auth_utils_1.signAccessToken)(payload.id);
        return { accessToken: newAccess, refreshToken: newRefresh };
    },
    async logout(token) {
        await refreshRepo.revokeByToken(token);
    },
    async requestPasswordReset(email) {
        const user = await userRepo.getUserByEmail(email);
        if (!user)
            return;
        const token = crypto_1.default.randomBytes(32).toString("hex");
        const expiresAt = (0, dayjs_1.default)().add(config_1.RESET_TOKEN_EXP_MIN, "minute").toDate();
        await resetRepo.createToken(user.id, token, expiresAt);
        const resetUrl = `${config_1.APP_URL}/reset-password?token=${token}&id=${user.id}`;
        await (0, mailer_utils_1.sendResetEmail)(user.email, resetUrl);
    },
    async resetPassword(token, password) {
        const rt = await resetRepo.getToken(token);
        if (!rt || rt.used || new Date(rt.expiresAt) < new Date()) {
            throw new Error("Invalid or expired reset token");
        }
        const passwordHash = await argon2_1.default.hash(password);
        await userRepo.updateUser(rt.userId, { password: passwordHash });
        await resetRepo.markAsUsed(rt.id);
    },
    async getCurrentUser(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, config_1.ACCESS_SECRET);
            const user = await userRepo.getUserById(payload.id);
            if (!user)
                throw new Error("User not found");
            const { password, ...safeUser } = user;
            return safeUser;
        }
        catch (err) {
            throw new Error("Invalid or expired access token");
        }
    },
};
