import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import { 
    createQuestionHandler,
    readQuestionHandler,
    updateQuestionHandler,
    deleteQuestionHandler,
    readAllQuestionsHandler
} from '../services/question';
import { validateRequest } from '../utils/validators';
import { HttpException } from '../utils/exceptions/http';


export const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.body, {
        title: yup.string().required().min(5).max(100),
    });

    if(isValid) {
        createQuestionHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const readQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.params, {
        uuid: yup.string().required().uuid(),
    });

    if(isValid) {
        readQuestionHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(
        { ...req.body, ...req.params },
        {
            title: yup.string().required().min(5).max(100),
            uuid: yup.string().required().uuid(),
        }
    );

    if(isValid) {
        updateQuestionHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.params, {
        uuid: yup.string().required().uuid(),
    });

    if(isValid) {
        deleteQuestionHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const readAllQuestions = async (req: Request, res: Response, next: NextFunction) => {
    readAllQuestionsHandler(req, res, next);
};
