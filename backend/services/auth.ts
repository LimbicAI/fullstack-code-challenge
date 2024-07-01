import { eq } from 'drizzle-orm';
import db from '../db';
import { users } from '../db/schemas';
import { authErrors } from '../common/errors';
import { signJWT, signRefreshJWT, verifyRefreshJWT } from '../utils/auth';

export const loginUser = async ({ userId }: { userId: number }) => {
  const user = await db.query.users.findFirst({ where: () => eq(users.id, userId) });

  if (user == null) {
    throw new Error(authErrors.USER_NOT_FOUND);
  }

  const token = signJWT(user);
  const refreshToken = signRefreshJWT(user);
  return { token, refreshToken, user };
};

export const refreshToken = async ({ refreshToken }: { refreshToken: string }) => {
  const userId = verifyRefreshJWT(refreshToken);

  const user = await db.query.users.findFirst({ where: () => eq(users.id, Number(userId)) });

  if (user == null) {
    throw new Error(authErrors.USER_NOT_FOUND);
  }

  const token = signJWT(user);

  return { token };
};
