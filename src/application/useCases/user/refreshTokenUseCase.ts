import {  verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@Infra/data/repositories/interfaces/IUsersRepository';
import { AppError } from '@Shared/errors/AppError';
import { IAuthProvider } from '@Shared/providers/interfaces/IAuthProvider';
import { IRefreshTokenResponseDTO } from '@DTO/user/IRefreshTokenResponseDTO';

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('AuthProvider')
        private authProvider: IAuthProvider
    ) {}

    async execute(token: string): Promise<IRefreshTokenResponseDTO> {
        const { email, sub } = verify(token, process.env.REFRESH_TOKEN_JWT_KEY) as { email: string; sub: string };

        if (!sub || !email) {
            throw new AppError('Invalid refresh token');
        }

        const user = await this.usersRepository.findById(sub);

        if (!user) {
            throw new AppError('Invalid refresh token');
        }

        const newToken = this.authProvider.generateToken({}, {
            subject: sub
        });

        const refresh_token = this.authProvider.generateRefreshToken({ email }, {
            subject: sub
        });

        return {
            token: newToken,
            refresh_token
        };
    }
}