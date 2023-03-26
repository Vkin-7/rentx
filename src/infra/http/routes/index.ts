import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerConfig from '../../../swagger.json';
import { authenticateRoutes } from './authenticate.routes';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

export const router = Router();

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerConfig));

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/sessions' ,authenticateRoutes);