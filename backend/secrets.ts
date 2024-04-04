import dotenv from 'dotenv';
import { Secret } from './src/utils/types';

dotenv.config();

const validateEnv = (value: string | undefined, name: string): string => {
    if (!value) {
        throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
};

const secrets: Secret = {
    port: validateEnv(process.env.PORT, 'PORT'),
    dbConfig: {
        DATABASE_URL: validateEnv(process.env.DATABASE_URL, 'DATABASE_URL'),        
    },
    jwtConfig: {
        JWT_SECRET: validateEnv(process.env.JWT_SECRET_KEY, 'JWT_SECRET_KEY'),
        JWT_EXPIRY: validateEnv(process.env.JWT_EXPIRY, 'JWT_EXPIRY'),
    }
};

export default secrets;
