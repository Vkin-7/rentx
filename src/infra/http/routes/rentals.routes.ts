import { Router } from 'express';

import { CreateRentalController } from '@Controllers/rental/createRentalController';
import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';

export const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const ensureAuthenticated =  new EnsureAuthenticated();


rentalsRoutes.use(ensureAuthenticated.handle);
rentalsRoutes.post('/', createRentalController.handle);