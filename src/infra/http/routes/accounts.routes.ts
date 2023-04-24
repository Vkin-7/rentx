import { Router } from 'express';

import { AuthenticateUserController } from '@Controllers/account/authenticateUserController';
import { RefreshTokenController } from '@Controllers/account/refreshTokenController';
import { SendForgotPasswordMailController } from '@Controllers/account/sendForgotPasswordMailController';

export const accountsRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();

accountsRoutes.post('/forgot', sendForgotPasswordMailController.handle);
accountsRoutes.post('/', authenticateUserController.handle);
accountsRoutes.post('/refresh-token', refreshTokenController.handle);