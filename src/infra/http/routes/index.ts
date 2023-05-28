import express, { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerConfig from '../../../swagger.json';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { carsRoutes } from './cars.routes';
import { rentalsRoutes } from './rentals.routes';
import { accountsRoutes } from './accounts.routes';
import upload from '@Services/upload';

export const router = Router();

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerConfig));

// TO DO Implement method to list folders and add static path and use path.resolve node
router.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
router.use('/cars', express.static(`${upload.tmpFolder}/cars`));

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRoutes);
router.use('/rentals', rentalsRoutes);
router.use('/accounts', accountsRoutes);