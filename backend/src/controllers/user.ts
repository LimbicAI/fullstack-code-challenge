import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import { signUpHandler, getAllUsersHandler, mockLoginHandler, getUserHandler } from '../services/user';
import { validateRequest } from '../utils/validators';
import { HttpException } from '../utils/exceptions/http';
import { UserRoleEnum } from '../utils/types';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    
    const { isValid, error } = await validateRequest(req.body, {
        username: yup.string().required(),
        email: yup.string().email().required(),
        name: yup.string().required(),
        role: yup.string().oneOf(Object.values(UserRoleEnum)).required(),
    });

    if(isValid) {
        signUpHandler(req, res, next);    
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    getAllUsersHandler(req, res, next);
};

export const mockLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.body, {
        username: yup.string().required(),
    });

    if(isValid) {
        mockLoginHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.params, {
        uuid: yup.string().required(),
    });

    if(isValid) {
        getUserHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};