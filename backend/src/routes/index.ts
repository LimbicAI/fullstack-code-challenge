import { Router } from 'express';

import { userRoutes } from './user';
import { questionRoutes } from './question';
import { answerRoutes } from './answer';

const appRouter = Router();

appRouter.use('/user', userRoutes);
appRouter.use('/question', questionRoutes);
appRouter.use('/answer', answerRoutes);

export { appRouter };
