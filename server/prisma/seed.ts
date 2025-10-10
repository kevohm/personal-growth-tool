import { PrismaClient, user_role } from '@prisma/client';
import argon2 from 'argon2';


const prisma = new PrismaClient();



async function main() {
    const hashedPass = await argon2.hash("password")
    const users = [{
        name: 'Guest',
        email: 'guest@example.com',
        password: hashedPass, // use argon2 hash in real setup
        role: user_role.guest,
    }]
    await prisma.user.createMany({
        data: users
    })
}

main().then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
