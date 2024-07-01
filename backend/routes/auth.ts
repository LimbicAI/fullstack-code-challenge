import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import z from 'zod';
import * as authService from '../services/auth';
import { authErrors } from '../common/errors';
import { httpLogger } from '../utils/loggers';

const authRouter = Router();

authRouter.post(
  '/login',
  validateRequest({
    body: z.object({
      userId: z.number(),
    }),
  }),
  async (req, res) => {
    try {
      const tokensAndUser = await authService.loginUser(req.body);

      return res.status(200).json(tokensAndUser);
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      // we'll proceed, but let's report it
      switch (message) {
        case authErrors.USER_NOT_FOUND: {
          res.status(404);
          break;
        }
        default: {
          httpLogger.error(error);
          res.status(500);
        }
      }

      return res.json({ message });
    }
  },
);

authRouter.post(
  '/refresh-token',
  validateRequest({
    body: z.object({
      refreshToken: z.string(),
    }),
  }),
  async (req, res) => {
    try {
      const newToken = await authService.refreshToken(req.body);

      return res.status(200).json({ token: newToken });
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      // we'll proceed, but let's report it
      switch (message) {
        case authErrors.USER_NOT_FOUND: {
          res.status(404);
          break;
        }
        default: {
          res.status(500);
        }
      }

      return res.json({ message });
    }
  },
);

export default authRouter;
