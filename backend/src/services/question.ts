import { Response, NextFunction } from 'express';

import { PrismaClient } from '@prisma/client';

import { HttpException } from '../utils/exceptions/http';
import { RequestObject } from '../utils/types';


const prisma = new PrismaClient();

export const createQuestionHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { title } = req.body;
        let uuid;
        if(req.currentUser) {
            uuid = req.currentUser.uuid;
        }

        const question = await prisma.question.create({
            data: {
                title,
                user: {
                    connect: {
                        uuid: uuid
                    }
                }
            }
        });

        return res.status(201).json(question);
    } catch(error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const readQuestionHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.params;
        const withAnswers = req.query.withAnswers === 'true';
        const question = await prisma.question.findUnique({
            where: {
                uuid
            },
            include: {
                user: {
                    select: {
                        uuid: true,
                        name: true
                    }
                },
                answers: withAnswers
                    ? {
                        include: {
                            user: {
                                select: {
                                    uuid: true,
                                    name: true
                                }
                            }
                        }
                    }
                    : false
            }
        });

        if (question) {
            if (withAnswers) {
                return res.status(200).json({ ...question, totalAnswers: question.answers.length });
            } else {
                return res.status(200).json(question);
            }
        } else {
            return res.status(404).json({ message: 'Question not found' });
        }
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const updateQuestionHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.params;
        const { title } = req.body;
        let question;

        if (req.currentUser) {
            question = await prisma.question.findUnique({
                where: {
                    uuid
                }
            });

            if (req.currentUser.uuid !== question?.userId) {
                return res.status(403).json({ message: 'Unauthorized' });
            }
        }

        const updatedQuestion = await prisma.question.update({
            where: {
                uuid
            },
            data: {
                title
            }
        });

        return res.status(200).json(updatedQuestion);
    } catch(error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const deleteQuestionHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.params;
        const question = await prisma.question.findUnique({
            where: {
                uuid
            }
        });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        if (req.currentUser && req.currentUser.uuid !== question.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const deletedQuestion = await prisma.question.delete({
            where: {
                uuid
            }
        });

        if (deletedQuestion) {
            return res.status(204).json();
        } else {
            return res.status(404).json({ message: 'Question not found' });
        }
    } catch(error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const readAllQuestionsHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const questions = await prisma.question.findMany({
            include: {
                user: {
                    select: {
                        uuid: true,
                        name: true
                    }
                }
            }
        });
        return res.status(200).json(questions);
    } catch(error: any) {
        next(new HttpException(400, error?.message, error));
    }
};
