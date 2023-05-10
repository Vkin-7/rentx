import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '@Controllers/user/createUserController';
import { UpdateUserAvatarController } from '@Controllers/user/updateUserAvatarController';
import uploadConfig from '@Services/upload';
import { EnsureAuthenticated } from '@Infra/http/middlewares/ensureAuthenticated';


export const usersRoutes = Router();

const ensureAuthenticated = new EnsureAuthenticated();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();


const uploadAvatar = multer(uploadConfig);

usersRoutes.use(ensureAuthenticated.handle);

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
    '/avatar',
    uploadAvatar.single('avatar'), 
    updateUserAvatarController.handle
);