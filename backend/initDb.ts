import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkAndSeed = async () => {
    try {
        const users = await prisma.user.findMany();
        if (users.length === 0) {
            console.log('No users found, seeding data...');
            await seed();
        } else {
            console.log('Database already contains data.');
        }
    } catch (error: any) {
        console.error('Error accessing the database: ', error.message);
        console.log('Attempting to migrate and seed database...');
        await migrateAndSeed();
    } finally {
        await prisma.$disconnect();
    }
};

const migrateAndSeed = async () => {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    await seed();
};

const seed = async () => {
    const createdUsers = [];

    for (let i = 1; i <= 3; i++) {
        const user = await prisma.user.create({
            data: {
                username: `johndoe${i}`,
                email: `johndoe${i}@gmail.com`,
                name: `John Doe ${i}`,
                role: i === 1 ? 'admin' : i === 2 ? 'client' : 'patient',
            },
        });
        createdUsers.push(user);
    }

    for (const user of createdUsers) {
        for (let j = 1; j <= 5; j++) {
            const question = await prisma.question.create({
                data: {
                    title: `Question ${j} from ${user.name}`,
                    userId: user.uuid,
                },
            });

            for (const answeringUser of createdUsers.filter(u => u.uuid !== user.uuid)) {
                await prisma.answer.create({
                    data: {
                        content: `Answer ${j} to Question ${j} by ${answeringUser.name}`,
                        userId: answeringUser.uuid,
                        questionId: question.uuid,
                    },
                });
            }
        }
    }

    console.log('Seeding completed.');
};

checkAndSeed();
