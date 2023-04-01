import { Router } from 'express';
import { CreateCarController } from '@Controllers/car/createCarController';
import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';
import { EnsureAdmin } from '../middlewares/ensureAdmin';

export const carsRoutes = Router();

const createCarController = new CreateCarController();

const ensureAuthenticated =  new EnsureAuthenticated();
const ensureAdmin = new EnsureAdmin();

carsRoutes.post(
    '/', 
    ensureAuthenticated.handle, 
    ensureAdmin.handle, 
    createCarController.handle
);
