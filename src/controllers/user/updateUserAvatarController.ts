import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from '@Application/useCases/user/updateUserAvatarUseCase';

export class UpdateUserAvatarController {
    async handle(request: Request, response: Response) {
        const { id: userId } = request.user;
        const avatarFile = request.file?.filename;

        if (avatarFile) {
            const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

            await updateUserAvatarUseCase.execute({
                userId,
                avatarFile
            });
    
            return response.status(204).send();
        }

        return response.status(400).send();
    }
}