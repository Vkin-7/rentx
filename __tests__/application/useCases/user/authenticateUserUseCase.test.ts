import 'reflect-metadata';

import * as dotenv from 'dotenv';

import { AuthenticateUserUseCase } from '@Application/useCases/user/authenticateUserUseCase';
import { CreateUserUseCase } from '@Application/useCases/user/createUserUseCase';
import { ICreateUserDTO } from '@DTO/user/ICreateUserDTO';
import { AuthProvider } from '@Shared/providers/authProvider';
import { HashProvider } from '@Shared/providers/hashProvider';
import { UsersRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/usersRepositoryInMemory';
import { AppError } from '@Shared/errors/AppError';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProvider: HashProvider;
let authProvider: AuthProvider;

describe('Authenticate User', () => {
    beforeAll(() => {
        dotenv.config();
    });

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        hashProvider = new HashProvider();
        authProvider = new AuthProvider();

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            hashProvider,
            authProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory, hashProvider);
    });

    it('Should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '00001',
            email: 'user@test.com',
            password: 'test',
            name: 'test'
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({ 
            email: user.email, 
            password: user.password 
        });

        expect(result).toHaveProperty('token');
    });

    it('Should not be able to authenticate an nonexistent user', async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({ 
                email: 'user@test.com', 
                password: 'test' 
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '00001',
                email: 'user@test.com',
                password: 'test',
                name: 'test'
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({ 
                email: user.email, 
                password: 'incorrect password' 
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with incorrect email', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '00001',
                email: 'user@test.com',
                password: 'test',
                name: 'test'
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({ 
                email: 'wrong@email.com', 
                password: user.password 
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});