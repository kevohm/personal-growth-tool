import {prisma} from "../db";
import { RefreshToken } from "@prisma/client";

export class RefreshTokenRepository {
  async createToken(userId: string, token: string, expiresAt: Date): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: { userId, token, expiresAt },
    });
  }

  async getToken(token: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({ where: { token } });
  }

  async revokeToken(id: string): Promise<RefreshToken> {
    return prisma.refreshToken.update({
      where: { id },
      data: { revoked: true },
    });
  }

  async replaceToken(id: string, newToken: string): Promise<RefreshToken> {
    return prisma.refreshToken.update({
      where: { id },
      data: { revoked: true, replacedBy: newToken },
    });
  }

  async deleteToken(id: string): Promise<RefreshToken> {
    return prisma.refreshToken.delete({ where: { id } });
  }

  async deleteExpiredTokens(): Promise<{ count: number }> {
    return prisma.refreshToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }
    async getLatestActiveToken(userId: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findFirst({
      where: { userId, revoked: false },
      orderBy: { createdAt: "desc" },
    });
  }

  async revokeByToken(token: string): Promise<{ count: number }> {
    return prisma.refreshToken.updateMany({
      where: { token },
      data: { revoked: true },
    });
  }

}
