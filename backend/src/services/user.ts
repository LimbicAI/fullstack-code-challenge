import { Response, NextFunction } from 'express';

import { PrismaClient } from '@prisma/client';

import { HttpException } from '../utils/exceptions/http';
import { RequestObject } from '../utils/types';
import { generateToken } from '../utils/helperFunctions';
import { TokenPayload } from '../utils/types';


const prisma = new PrismaClient();

export const signUpHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { username, name, email, role } = req.body;

        const user = await prisma.user.create({
            data: {
                username,
                name,
                email,
                role,
            },
        });

        return res.status(201).json(user);
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const getAllUsersHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const mockLoginHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { username } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                username,
            },
            select: {
                uuid: true,
                username: true,
                email: true,
                name: true,
                role: true,
            }
        });
        if (!user) {
            next(new HttpException(404, 'User not found', []));
        }
        const token = generateToken(user as TokenPayload);
        return res.status(200).json({
            user: user,
            'access_token': token,
            'token_type': 'Bearer',
        });
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const getUserHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.params;
        const { withQuestions, withAnswers } = req.query;
        const user = await prisma.user.findUnique({
            where: {
                uuid,
            },
            include: {
                questions: withQuestions === 'true',
                answers: withAnswers === 'true',
            },
        });

        if (user) {
            let responseData: any = { ...user };
            if (withQuestions === 'true') {
                responseData = {
                    ...responseData,
                    totalQuestions: user.questions.length,
                };
            }
            if (withAnswers === 'true') {
                responseData = {
                    ...responseData,
                    totalAnswers: user.answers.length,
                };
            }
            return res.status(200).json({responseData});
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};