import { Router } from 'express';
import multer from 'multer';

import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';
import { EnsureAdmin } from '../middlewares/ensureAdmin';

import { CreateCarController } from '@Controllers/car/createCarController';
import { ListAvailableCarsController } from '@Controllers/car/listAvailableCarsController';
import { CreateCarSpecificationController } from '@Controllers/car/createCarSpecificationController';
import { UploadCarImagesController } from '@Controllers/car/uploadCarImagesController';
import { UploadService } from '@Services/upload';

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const ensureAuthenticated =  new EnsureAuthenticated();
const ensureAdmin = new EnsureAdmin();
const uploadService = new UploadService();

const upload = multer(uploadService.upload('./tmp/cars'));


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

carsRoutes.post(
    '/images/:id',
    ensureAuthenticated.handle, 
    ensureAdmin.handle,
    upload.array('images'),
    uploadCarImagesController.handle
);
