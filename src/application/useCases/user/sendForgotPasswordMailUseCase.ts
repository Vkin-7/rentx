import { inject, injectable } from 'tsyringe';
import { randomUUID } from 'node:crypto';

import { IUsersRepository } from '@Infra/data/repositories/interfaces/IUsersRepository';
import { AppError } from '@Shared/errors/AppError';
import { IDateProvider } from '@Shared/providers/interfaces/IDateProvider';
import { IMailProvider, MailTemplateString } from '@Shared/providers/interfaces/IMailProvider';


@injectable()
export class SendForgotPasswordMailUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider,
        @inject('MailProvider')
        private mailProvider: IMailProvider
    ) {}
    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists!');
        }

        const token = randomUUID();
        const expires_date = this.dateProvider.addHours(3);

        await this.mailProvider.sendMail(
            email as MailTemplateString, 
            'Recuperação de senha', 
            `O link para o reset é ${token}/${expires_date}`
        );
    }
}