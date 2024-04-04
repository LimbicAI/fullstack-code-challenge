import { Response, NextFunction } from 'express';

import { PrismaClient } from '@prisma/client';

import { HttpException } from '../utils/exceptions/http';
import { RequestObject } from '../utils/types';


const prisma = new PrismaClient();

export const createAnswerHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { content, questionId } = req.body;
        let userUuid;
        if(req.currentUser) {
            userUuid = req.currentUser.uuid;
        }

        const answer = await prisma.answer.create({
            data: {
                content,
                user: {
                    connect: {
                        uuid: userUuid
                    }
                },
                question: {
                    connect: {
                        uuid: questionId
                    }
                }
            }
        });

        return res.status(201).json(answer);
    } catch(error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const readAnswerHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { uuid, withUser, withQuestion } = req.params;
        const answer = await prisma.answer.findUnique({
            where: {
                uuid
            },
            include: {
                user: withUser ? {
                    select: {
                        uuid: true,
                        name: true
                    }
                } : false,
                question: withQuestion ? {
                    select: {
                        uuid: true,
                        title: true
                    }
                } : false
            },
            ...(withUser || withQuestion ? {
                select: {}
            } : {})
        });

        if(answer) {
            return res.status(200).json(answer);
        } else {
            return res.status(404).json({ message: 'Answer not found' });
        }
    } catch(error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const updateAnswerHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.params;
        const { content } = req.body;
        let answer;

        if (req.currentUser) {
            answer = await prisma.answer.findUnique({
                where: {
                    uuid
                }
            });

            if (answer) {
                if (answer.userId === req.currentUser.uuid || req.currentUser.role === 'admin') {
                    const answer = await prisma.answer.update({
                        where: {
                            uuid
                        },
                        data: {
                            content
                        }
                    });

                    return res.status(200).json(answer);
                } else {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            } else {
                return res.status(404).json({ message: 'Answer not found' });
            }
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const deleteAnswerHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.params;
        let answer;

        if (req.currentUser) {
            answer = await prisma.answer.findUnique({
                where: {
                    uuid
                }
            });

            if (answer) {
                if (answer.userId === req.currentUser.uuid || req.currentUser.role === 'admin') {
                    const answer = await prisma.answer.delete({
                        where: {
                            uuid
                        }
                    });

                    return res.status(200).json(answer);
                } else {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            } else {
                return res.status(404).json({ message: 'Answer not found' });
            }
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const readAllAnswersHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const answers = await prisma.answer.findMany({
            include: {
                user: {
                    select: {
                        uuid: true,
                        name: true
                    }
                },
                question: {
                    select: {
                        uuid: true,
                        title: true
                    }
                }
            }
        });

        return res.status(200).json(answers);
    } catch(error: any) {
        next(new HttpException(400, error?.message, error));
    }
};
