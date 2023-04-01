import { NextFunction, Request, Response } from 'express';
import { IEnsureAdmin } from './interfaces/IEnsureAdmin';
import { UsersRepository } from '@Infra/data/repositories/usersRepository';
import { AppError } from '@Shared/errors/AppError';

export class EnsureAdmin implements IEnsureAdmin{
    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        const { id } = request.user;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(id);

        if (!user?.isAdmin) {
            throw new AppError('User is not a admin!');
        }
        
        return next();
    }
}