"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = require("../db");
class UserRepository {
    async createUser(email, passwordHash, name, role = "guest") {
        return db_1.prisma.user.create({
            data: { email, password: passwordHash, name, role },
        });
    }
    async getUserById(id) {
        return db_1.prisma.user.findUnique({ where: { id } });
    }
    async getUserByEmail(email) {
        return db_1.prisma.user.findUnique({ where: { email } });
    }
    async updateUser(id, data) {
        return db_1.prisma.user.update({ where: { id }, data });
    }
    async deleteUser(id) {
        return db_1.prisma.user.delete({ where: { id } });
    }
    async listUsers() {
        return db_1.prisma.user.findMany();
    }
}
exports.UserRepository = UserRepository;
