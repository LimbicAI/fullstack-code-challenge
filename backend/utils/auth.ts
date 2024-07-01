import config from '../config';
import { DEFAULT_EXPIRES_IN, DEFAULT_REFRESH_EXPIRES_IN } from '../config/auth';
import { User } from '../db/schemas';
import jwt from 'jsonwebtoken';

export const signJWT = (data: User) => {
  const token = jwt.sign(data, config.secret, { expiresIn: DEFAULT_EXPIRES_IN });

  return token;
};

export const signRefreshJWT = (data: User) => {
  const token = jwt.sign(data, config.refreshSecret, {
    expiresIn: DEFAULT_REFRESH_EXPIRES_IN,
  });

  return token;
};

export const verifyJWT = (token: string) => {
  const user = jwt.verify(token, config.secret);

  return user;
};

export const verifyRefreshJWT = (token: string) => {
  const user = jwt.verify(token, config.refreshSecret);

  return user;
};
