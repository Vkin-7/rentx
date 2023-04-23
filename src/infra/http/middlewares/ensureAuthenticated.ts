import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


import { IEnsureAuthenticated } from './interfaces/IEnsureAuthenticated';
import { IEnsureAuthenticatedPayload } from './interfaces/IEnsureAuthenticatedPayload';
import { UsersRepository } from '@Repositories/usersRepository';
import { AppError } from '@Shared/errors/AppError';
import { StatusCode } from '@Domain/constants/StatusCode';

export class EnsureAuthenticated implements IEnsureAuthenticated {

    async handle(request: Request, response: Response, next: NextFunction) {
        try {
            const authHeader = request.headers.authorization;

            if (!authHeader) {
                throw new AppError('Token missing', StatusCode.UNAUTHORIZED);
            }
    
            const [, token] = authHeader.split(' ');
    
            const { sub: userId } = jwt.verify(token, process.env.REFRESH_TOKEN_JWT_KEY) as IEnsureAuthenticatedPayload;
            
            const userRepository = new UsersRepository();

            const user = await userRepository.findById(userId);

            if (!user) {
                throw new AppError('User does not exists!', StatusCode.UNAUTHORIZED);
            }

            request.user = {
                id: userId
            };

            next();
        } catch (error) {
            throw new AppError('Error in authentication', StatusCode.UNAUTHORIZED);
        }

    }
}