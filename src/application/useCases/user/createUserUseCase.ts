import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@DTO/user/ICreateUserDTO';
import { IUsersRepository } from '@Repositories/interfaces/IUsersRepository';
import { IHashProvider } from '@Shared/providers/interfaces/IHashProvider';

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    async execute(data: ICreateUserDTO): Promise<boolean> {
        const passwordHash = this.hashProvider.generateHash(data.password);

        return await this.userRepository.create({ ...data, password: passwordHash });
    }
}