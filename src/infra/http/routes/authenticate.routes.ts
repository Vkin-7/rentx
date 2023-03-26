import { AuthenticateUserController } from '@Controllers/user/authenticateUserController';
import { Router } from 'express';

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/', authenticateUserController.handle);