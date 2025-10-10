"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRepository = void 0;
const db_1 = require("../db");
class RefreshTokenRepository {
    async createToken(userId, token, expiresAt) {
        return db_1.prisma.refreshToken.create({
            data: { userId, token, expiresAt },
        });
    }
    async getToken(token) {
        return db_1.prisma.refreshToken.findUnique({ where: { token } });
    }
    async revokeToken(id) {
        return db_1.prisma.refreshToken.update({
            where: { id },
            data: { revoked: true },
        });
    }
    async replaceToken(id, newToken) {
        return db_1.prisma.refreshToken.update({
            where: { id },
            data: { revoked: true, replacedBy: newToken },
        });
    }
    async deleteToken(id) {
        return db_1.prisma.refreshToken.delete({ where: { id } });
    }
    async deleteExpiredTokens() {
        return db_1.prisma.refreshToken.deleteMany({
            where: { expiresAt: { lt: new Date() } },
        });
    }
    async getLatestActiveToken(userId) {
        return db_1.prisma.refreshToken.findFirst({
            where: { userId, revoked: false },
            orderBy: { createdAt: "desc" },
        });
    }
    async revokeByToken(token) {
        return db_1.prisma.refreshToken.updateMany({
            where: { token },
            data: { revoked: true },
        });
    }
}
exports.RefreshTokenRepository = RefreshTokenRepository;
