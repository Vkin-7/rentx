import { Router } from 'express';
import { CreateSpecificationController } from '@Controllers/specification/createSpecificationController';
import { EnsureAuthenticated } from '@Infra/http/middlewares/ensureAuthenticated';

export const specificationsRoutes = Router();

const ensureAuthenticated = new EnsureAuthenticated();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated.handle);
specificationsRoutes.post('/', createSpecificationController.handle);