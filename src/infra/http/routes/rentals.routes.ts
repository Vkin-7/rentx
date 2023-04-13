import { Router } from 'express';

import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalController } from '@Controllers/rental/createRentalController';
import { DevolutionRentalController } from '@Controllers/rental/devolutionRentalController';

export const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const ensureAuthenticated =  new EnsureAuthenticated();


rentalsRoutes.use(ensureAuthenticated.handle);
rentalsRoutes.post('/', createRentalController.handle);
rentalsRoutes.post('/devolution/:id', devolutionRentalController.handle);