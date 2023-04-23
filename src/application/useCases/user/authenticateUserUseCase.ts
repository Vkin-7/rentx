import { inject, injectable } from 'tsyringe';

import { IAuthenticateUserDTO } from '@DTO/user/IAuthenticateUserDTO';
import { IUsersRepository } from '@Repositories/interfaces/IUsersRepository';
import { IHashProvider } from '@Shared/providers/interfaces/IHashProvider';
import { IAuthenticatedUserDTO } from '@DTO/user/IAuthenticatedUserDTO';
import { IAuthProvider } from '@Shared/providers/interfaces/IAuthProvider';
import { AppError } from '@Shared/errors/AppError';

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        @inject('AuthProvider')
        private authProvider: IAuthProvider,
    ) {}

    async execute({ email, password }: IAuthenticateUserDTO): Promise<IAuthenticatedUserDTO | null> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Email or password incorrect!');
        }

        const passwordMatch = this.hashProvider.compareHash(password, user.password);

        if(!passwordMatch) {
            throw new AppError('Email or password incorrect!');
        }

        const token = this.authProvider.generateToken({}, {
            subject: user.id,
        });

        const refresh_token = this.authProvider.generateRefreshToken({ email }, {
            subject: user.id,
        });

        return {
            user: {
                name: user.name,
                email: user.email
            },
            token,
            refresh_token
        };

    }
}