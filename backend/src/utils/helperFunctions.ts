import jwt from 'jsonwebtoken';

import secrets from '../../secrets';
import { TokenPayload } from './types';

export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, secrets.jwtConfig.JWT_SECRET, {
        expiresIn: secrets.jwtConfig.JWT_EXPIRY,
    });
};

export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, secrets.jwtConfig.JWT_SECRET) as TokenPayload;
};
