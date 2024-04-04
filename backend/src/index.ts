import express, { urlencoded, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import secrets from '../secrets';
import { appRouter as appRoutes } from './routes';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(appRoutes);
app.use('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello from fullstack-code-challeenge' });
});

try {
    (async () => await prisma.$connect())();
    console.log('Database connection established.');
    app.listen(secrets.port, () => {
        console.log(`Server started at PORT ${secrets.port}`);
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
}