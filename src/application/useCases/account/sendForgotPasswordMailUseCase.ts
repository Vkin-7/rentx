import { inject, injectable } from 'tsyringe';
import { resolve } from 'node:path';

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

        const templatePath = resolve('./src/shared/views/templateEmails/forgotPassword.hbs');

        const token = this.mailProvider.generateEmailToken({
            id: user.id,
            email: user.email
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        };

        await this.mailProvider.sendMail(
            email as MailTemplateString, 
            'Recuperação de senha', 
            variables,
            templatePath
        );
    }
}