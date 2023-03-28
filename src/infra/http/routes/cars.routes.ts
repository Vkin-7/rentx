import { Router } from 'express';
import { CreateCarController } from '@Controllers/car/createCarController';

export const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post('/', createCarController.handle);
