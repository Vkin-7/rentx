import { Router } from 'express';

import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalController } from '@Controllers/rental/createRentalController';
import { DevolutionRentalController } from '@Controllers/rental/devolutionRentalController';
import { ListRentalsByUserController } from '@Controllers/rental/listRentalsByUserController';

export const rentalsRoutes = Router();

const ensureAuthenticated =  new EnsureAuthenticated();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();


rentalsRoutes.use(ensureAuthenticated.handle);
rentalsRoutes.post('/', createRentalController.handle);
rentalsRoutes.post('/devolution/:id', devolutionRentalController.handle);
rentalsRoutes.get('/user', listRentalsByUserController.handle);