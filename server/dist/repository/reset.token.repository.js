"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetTokenRepository = void 0;
const db_1 = require("../db");
class ResetTokenRepository {
    async createToken(userId, token, expiresAt) {
        return db_1.prisma.resetToken.create({
            data: { userId, token, expiresAt },
        });
    }
    async getToken(token) {
        return db_1.prisma.resetToken.findUnique({ where: { token } });
    }
    async markAsUsed(id) {
        return db_1.prisma.resetToken.update({
            where: { id },
            data: { used: true },
        });
    }
    async deleteToken(id) {
        return db_1.prisma.resetToken.delete({ where: { id } });
    }
    async deleteExpiredTokens() {
        return db_1.prisma.resetToken.deleteMany({
            where: { expiresAt: { lt: new Date() } },
        });
    }
}
exports.ResetTokenRepository = ResetTokenRepository;
