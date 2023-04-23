import 'reflect-metadata';

import { CreateCategoryUseCase } from '@Application/useCases/category/createCategoryUseCase';
import { CategoriesRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/categoriesRepositoryInMemory';
import { AppError } from '@Shared/errors/AppError';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create category',  () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });
    
    it('Should be able to create a new category', async () => {
        const result = await createCategoryUseCase.execute({
            name: 'Category Name Test',
            description: 'Category Description Test'
        });

        expect(result).toBe(true);
    });

    it('Should not be able to create a new category with the same name', async () => {
        await createCategoryUseCase.execute({
            name: 'Category Name Test',
            description: 'Category Description Test'
        });
        
        await expect(
            createCategoryUseCase.execute({
                name: 'Category Name Test',
                description: 'Category Description Test'
            })
        ).rejects.toEqual(new AppError('Category already exists!'));
    });
});