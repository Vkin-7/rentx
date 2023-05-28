import { inject, injectable } from 'tsyringe';

import { User } from '@Entities/User';
import { IUsersRepository } from '@Infra/data/repositories/interfaces/IUsersRepository';
import { IUserResponseDTO } from '@DTO/user/IUserResponseDTO';
import { UserMap } from '@Application/mapper/user/userMap';

@injectable()
export class ProfileUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<IUserResponseDTO | null> {
        const user = await this.usersRepository.findById(id);

        if (user) return UserMap.toDTO(user);

        return null;
    }
}