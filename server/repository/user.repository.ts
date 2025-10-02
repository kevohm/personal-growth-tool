import { prisma } from "../db";
import { User, user_role } from '@prisma/client';

export class UserRepository {
  async createUser(email: string, passwordHash: string, name?: string, role: user_role = "guest"): Promise<User> {
    return prisma.user.create({
      data: { email, passwordHash, name, role },
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }

  async listUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }
}
