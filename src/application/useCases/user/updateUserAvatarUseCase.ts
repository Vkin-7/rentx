/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { inject, injectable } from 'tsyringe';
import path from 'node:path';

import { IUpdateUserAvatarDTO } from '@DTO/user/IUpdateUserAvatarDTO';
import { IUsersRepository } from '@Repositories/interfaces/IUsersRepository';

import { InternalFile } from '@Shared/utils/file';


@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('InternalFile')
        private internalFile: InternalFile
    ) {}

    async execute(data: IUpdateUserAvatarDTO): Promise<void> {
        const user = await this.usersRepository.findById(data.userId);

        if (user?.avatar) {
            await this.internalFile.delete(path.resolve('./tmp/avatar', user?.avatar));
        }

        user!.avatar = data.avatarFile;

        await this.usersRepository.update(user!);
    }
}