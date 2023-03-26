import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '@Controllers/user/createUserController';
import { UpdateUserAvatarController } from '@Controllers/user/updateUserAvatarController';
import { UploadService } from '@Services/upload';
import { EnsureAuthenticated } from '@Infra/http/middlewares/ensureAuthenticated';


export const usersRoutes = Router();

const ensureAuthenticated = new EnsureAuthenticated();
const uploadService = new UploadService();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();


const uploadAvatar = multer(uploadService.upload('./tmp/avatar'));

usersRoutes.use(ensureAuthenticated.handle);

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
    '/avatar',
    uploadAvatar.single('avatar'), 
    updateUserAvatarController.handle
);