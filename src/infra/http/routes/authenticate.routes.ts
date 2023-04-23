import { Router } from 'express';

import { AuthenticateUserController } from '@Controllers/user/authenticateUserController';
import { RefreshTokenController } from '@Controllers/user/refreshTokenController';

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);