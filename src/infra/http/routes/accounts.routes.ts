import { Router } from 'express';

import { AuthenticateUserController } from '@Controllers/account/authenticateUserController';
import { RefreshTokenController } from '@Controllers/account/refreshTokenController';
import { SendForgotPasswordMailController } from '@Controllers/account/sendForgotPasswordMailController';
import { ResetPasswordUserController } from '@Controllers/account/resetPasswordUserController';

export const accountsRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

accountsRoutes.post('/', authenticateUserController.handle);
accountsRoutes.post('/refresh-token', refreshTokenController.handle);
accountsRoutes.post('/forgot-password', sendForgotPasswordMailController.handle);
accountsRoutes.post('/reset-password', resetPasswordUserController.handle);