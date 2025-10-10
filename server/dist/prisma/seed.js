"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2_1 = __importDefault(require("argon2"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPass = await argon2_1.default.hash("password");
    const users = [{
            name: 'Guest',
            email: 'guest@example.com',
            password: hashedPass, // use argon2 hash in real setup
            role: client_1.user_role.guest,
        }];
    await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    });
}
main().then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
