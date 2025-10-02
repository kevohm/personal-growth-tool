
import { ResetToken } from "@prisma/client";
import { prisma } from "../db";

export class ResetTokenRepository {
  async createToken(userId: string, token: string, expiresAt: Date): Promise<ResetToken> {
    return prisma.resetToken.create({
      data: { userId, token, expiresAt },
    });
  }

  async getToken(token: string): Promise<ResetToken | null> {
    return prisma.resetToken.findUnique({ where: { token } });
  }

  async markAsUsed(id: string): Promise<ResetToken> {
    return prisma.resetToken.update({
      where: { id },
      data: { used: true },
    });
  }

  async deleteToken(id: string): Promise<ResetToken> {
    return prisma.resetToken.delete({ where: { id } });
  }

  async deleteExpiredTokens(): Promise<{ count: number }> {
    return prisma.resetToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }
}
