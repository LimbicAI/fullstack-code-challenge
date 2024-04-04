import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import { 
    createAnswerHandler,
    readAnswerHandler,
    updateAnswerHandler,
    deleteAnswerHandler,
    readAllAnswersHandler
} from '../services/answer';
import { validateRequest } from '../utils/validators';
import { HttpException } from '../utils/exceptions/http';

export const createAnswer = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.body, {
        questionId: yup.string().required().uuid(),
        content: yup.string().required().min(5).max(100),
    });

    if(isValid) {
        createAnswerHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }

};

export const readAnswer = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.params, {
        uuid: yup.string().required().uuid(),
    });

    if(isValid) {
        readAnswerHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const updateAnswer = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(
        { ...req.body, ...req.params },
        {
            content: yup.string().required().min(5).max(100),
            uuid: yup.string().required().uuid(),
        }
    );

    if(isValid) {
        updateAnswerHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const deleteAnswer = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.params, {
        uuid: yup.string().required().uuid(),
    });

    if(isValid) {
        deleteAnswerHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const readAllAnswers = async (req: Request, res: Response, next: NextFunction) => {
    readAllAnswersHandler(req, res, next);
};
