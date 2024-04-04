import { Router } from 'express';

import { type Route } from '../utils/types/index';
import { createAnswer, readAnswer, updateAnswer, deleteAnswer, readAllAnswers } from '../controllers/answer';
import { isAuthenticated } from '../middlewares';

const router = Router();

const answerRoute: Route[] = [
    {
        method: 'post',
        route: '/',
        middlewares: [isAuthenticated],
        controller: createAnswer
    },
    {
        method: 'get',
        route: '/:uuid',
        middlewares: [isAuthenticated],
        controller: readAnswer
    },
    {
        method: 'put',
        route: '/:uuid',
        middlewares: [isAuthenticated],
        controller: updateAnswer
    },
    {
        method: 'delete',
        route: '/:uuid',
        middlewares: [isAuthenticated],
        controller: deleteAnswer
    },
    {
        method: 'get',
        route: '/',
        middlewares: [isAuthenticated],
        controller: readAllAnswers
    }
];

answerRoute.forEach(route => {
    router[route.method](route.route, route.middlewares, route.controller);
});

export { router as answerRoutes };

