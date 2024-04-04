import { Response, NextFunction } from 'express';
import { HttpException } from '../utils/exceptions/http';
import { RequestObject } from '../utils/types';
import { UserRoleEnum } from '../utils/types';

export const isAuthorized = (roles: UserRoleEnum[]) => {
    const authMiddleware = async (
        req: RequestObject,
        res: Response,
        next: NextFunction
    ) => {
        const currentUser = req?.currentUser;
        if (!currentUser) {
            next(new HttpException(401, 'You are not authorized to perform this action', []));
        } else {
            if (roles.includes(currentUser.role as UserRoleEnum)) {
                next();
            } else {
                next(new HttpException(401,'You are not authorized to perform this action',[]));
            }
        }
    };

    return authMiddleware;
};
