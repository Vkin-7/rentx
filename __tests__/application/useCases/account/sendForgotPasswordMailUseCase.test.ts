import 'reflect-metadata';

import { SendForgotPasswordMailUseCase } from '@Application/useCases/account/sendForgotPasswordMailUseCase';
import { UsersRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/usersRepositoryInMemory';
import { DateProvider } from '@Shared/providers/dateProvider';
import { MailProviderInMemory } from '@Tests/shared/providers/mailProviderInMemory';
import { AppError } from '@Shared/errors/AppError';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe('Send Forgot Mail', () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DateProvider();
        mailProviderInMemory = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            dateProvider,
            mailProviderInMemory
        );
    });

    it('Should be able to send a forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

        await usersRepositoryInMemory.create({
            driver_license: '132456',
            email: 'test@test.com',
            name: 'Jorge Wagner',
            password: '987456'
        });

        await sendForgotPasswordMailUseCase.execute('test@test.com');

        expect(sendMail).toHaveBeenCalled();
    });

    it('Should not be able to send an email if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('test@test.com')
        ).rejects.toEqual(new AppError('User does not exists!'));
    });

});
