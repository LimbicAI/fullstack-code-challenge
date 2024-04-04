import { Response, NextFunction } from 'express';

import { PrismaClient } from '@prisma/client';

import { HttpException } from '../utils/exceptions/http';
import { RequestObject } from '../utils/types';
import { verifyToken } from '../utils/helperFunctions';

const prisma = new PrismaClient();

export const isAuthenticated = async (
    req: RequestObject,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers['x-access-token'] as string;
    if (!token) {
        next(new HttpException(401, 'Token Missing!', []));
    }

    try {
        const userData = verifyToken(token);
        if (!userData) {
            next(new HttpException(401,'Invalid Token! Please Login Again',[]));
        }

        const user = await prisma.user.findUnique({
            where: {
                email: userData.email,
            },
        });
        if (!user) {
            next(new HttpException(401,'Not Authenticated Please Contact Admin For Permission',[]));
            return;
        }

        const { role } = user;
        req.currentUser = { ...userData, role };
        next();
    } catch (error) {
        console.error(error);
        next(new HttpException(401, 'Not Authenticated', []));
    }
};
