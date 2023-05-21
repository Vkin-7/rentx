/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { inject, injectable } from 'tsyringe';

import { IUpdateUserAvatarDTO } from '@DTO/user/IUpdateUserAvatarDTO';
import { IUsersRepository } from '@Repositories/interfaces/IUsersRepository';

import { IStorageProvider } from '@Shared/providers/interfaces/IStorageProvider';


@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}

    async execute(data: IUpdateUserAvatarDTO): Promise<void> {
        const user = await this.usersRepository.findById(data.userId);

        if (user?.avatar) {
            await this.storageProvider.delete(user.avatar, 'avatar');
        }

        await this.storageProvider.save(data.avatarFile, 'avatar');

        user!.avatar = data.avatarFile;

        await this.usersRepository.update(user!);
    }
}