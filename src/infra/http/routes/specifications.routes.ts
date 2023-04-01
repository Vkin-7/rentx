import { Router } from 'express';
import { CreateSpecificationController } from '@Controllers/specification/createSpecificationController';
import { EnsureAuthenticated } from '@Infra/http/middlewares/ensureAuthenticated';
import { EnsureAdmin } from '../middlewares/ensureAdmin';

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

const ensureAuthenticated =  new EnsureAuthenticated();
const ensureAdmin = new EnsureAdmin();

specificationsRoutes.use(ensureAuthenticated.handle, ensureAdmin.handle);
specificationsRoutes.post('/', createSpecificationController.handle);