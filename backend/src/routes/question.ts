import { Router } from 'express';

import { UserRoleEnum, type Route } from '../utils/types/index';
import { 
    createQuestion,
    readQuestion,
    updateQuestion,
    deleteQuestion,
    readAllQuestions
} from '../controllers/question';

import { isAuthenticated, isAuthorized } from '../middlewares';

const router = Router();

const questionRoute: Route[] = [
    {
        method: 'post',
        route: '/',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN, UserRoleEnum.CLIENT])],
        controller: createQuestion
    },
    {
        method: 'get',
        route: '/:uuid',
        middlewares: [isAuthenticated],
        controller: readQuestion
    },
    {
        method: 'put',
        route: '/:uuid',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN, UserRoleEnum.CLIENT])],
        controller: updateQuestion
    },
    {
        method: 'delete',
        route: '/:uuid',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN, UserRoleEnum.CLIENT])],
        controller: deleteQuestion
    },
    {
        method: 'get',
        route: '/',
        middlewares: [isAuthenticated],
        controller: readAllQuestions
    }
];

questionRoute.forEach(route => {
    router[route.method](route.route, route.middlewares, route.controller);
});

export { router as questionRoutes };