import { Request, Response, NextFunction } from 'express';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type Controller = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Route = {
    method: HttpMethod;
    route: string;
    middlewares: Middleware[];
    controller: Controller;
};

export type DatabaseConfig = {
    DATABASE_URL: string;
}

export type Secret = {
    port: string;
    dbConfig: DatabaseConfig;
    jwtConfig: {
        JWT_SECRET: string;
        JWT_EXPIRY: string;
    }
}

export type RequestObject = Request & {
    currentUser?: {
        uuid: string;
        username: string;
        email: string;
        role:  string;
    };
}

export type TokenPayload = {
    uuid: string;
    username: string;
    email: string;
    name: string;
    role: string;
}

export enum UserRoleEnum {
    ADMIN = 'admin',
    CLIENT = 'client',
    PATIENT = 'patient',
}