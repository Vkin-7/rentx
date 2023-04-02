import { Router } from 'express';

import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';
import { EnsureAdmin } from '../middlewares/ensureAdmin';

import { CreateCarController } from '@Controllers/car/createCarController';
import { ListAvailableCarsController } from '@Controllers/car/listAvailableCarsController';
import { CreateCarSpecificationController } from '@Controllers/car/createCarSpecificationController';

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

const ensureAuthenticated =  new EnsureAuthenticated();
const ensureAdmin = new EnsureAdmin();

carsRoutes.post(
    '/', 
    ensureAuthenticated.handle, 
    ensureAdmin.handle, 
    createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
    '/specifications/:id', 
    ensureAuthenticated.handle, 
    ensureAdmin.handle, 
    createCarSpecificationController.handle
);
