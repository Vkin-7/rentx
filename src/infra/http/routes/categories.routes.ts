import { Router } from 'express';
import { CreateCategoryController } from '@Controllers/category/createCategoryController';
import { ListCategoriesController } from '@Controllers/category/listCategoriesController';

import multer from 'multer';
import { ImportCategoryController } from '@Controllers/category/importCategoryController';
import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';
import { EnsureAdmin } from '../middlewares/ensureAdmin';

const upload = multer({
    dest: './tmp'
});

export const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

const ensureAuthenticated =  new EnsureAuthenticated();
const ensureAdmin = new EnsureAdmin();

categoriesRoutes.get('/', listCategoryController.handle);
categoriesRoutes.post(
    '/', 
    ensureAuthenticated.handle, 
    ensureAdmin.handle, 
    createCategoryController.handle
);
categoriesRoutes.post(
    '/import', 
    ensureAuthenticated.handle, 
    ensureAdmin.handle, 
    upload.single('file'), 
    importCategoryController.handle
);