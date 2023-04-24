import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@Infra/data/repositories/interfaces/IUsersRepository';
import { AppError } from '@Shared/errors/AppError';
import { IHashProvider } from '@Shared/providers/interfaces/IHashProvider';


@injectable()
export class ResetPasswordUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}
    async execute(token: string, password: string): Promise<void> {
        const { id, email } = verify(token, process.env.EMAIL_TOKEN_KEY) as { 
            id: string; 
            email: string; 
        };

        if (!email) {
            throw new AppError('Token invalid!');
        }

        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User does not exists!');
        }

        user.password = this.hashProvider.generateHash(password);

        await this.usersRepository.update(user);
    }
}