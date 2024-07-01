import { verifyJWT } from '../utils/auth';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { User } from '../db/schemas';
import { Context } from '../graphql/context';
import { ContextFunction } from '@apollo/server';
import { runtimeLogger } from '../utils/loggers';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export const authMiddleware: ContextFunction<[ExpressContextFunctionArgument], Context> = async ({
  req,
}) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') ?? '';
    const user = verifyJWT(token) as User;
    return { user, userId: user.id };
  } catch (error) {
    if (
      error instanceof JsonWebTokenError ||
      error instanceof TokenExpiredError ||
      error instanceof NotBeforeError
    ) {
      runtimeLogger.error(error);
      throw new AuthenticationError(error?.message, {
        code: error.name,
        http: { status: 401 },
        originalError: error,
      });
    }

    throw error;
  }
};
