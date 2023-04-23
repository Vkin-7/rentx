import { SendForgotPasswordMailController } from '@Controllers/user/sendForgotPasswordMailController';
import { Router } from 'express';

export const accountsRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

accountsRoutes.post('/forgot', sendForgotPasswordMailController.handle);