import { Router } from 'express';
import { CreateCategoryController } from '@Controllers/category/createCategoryController';
import { ListCategoriesController } from '@Controllers/category/listCategoriesController';

import multer from 'multer';
import { ImportCategoryController } from '@Controllers/category/importCategoryController';

const upload = multer({
    dest: './tmp'
});

export const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.get('/', listCategoryController.handle);
categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle);