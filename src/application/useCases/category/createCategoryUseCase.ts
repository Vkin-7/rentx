import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from '@DTO/category/ICreateCategoryDTO';
import { ICategoriesRepository } from '@Repositories/interfaces/ICategoriesRepository';
import { AppError } from '@Shared/errors/AppError';

@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoryRepository: ICategoriesRepository
    ) {}

    async execute(data: ICreateCategoryDTO): Promise<boolean> {
        const categoryAlreadyExist = await this.categoryRepository.getByName(data.name);

        if (categoryAlreadyExist) {
            throw new AppError('Category already exists!');
        }

        return await this.categoryRepository.create({ ...data });
    }
}