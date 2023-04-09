import { inject, injectable } from 'tsyringe';

import { Category } from '@Infra/data/entities/Category';
import { ICategoriesRepository } from '@Infra/data/repositories/interfaces/ICategoriesRepository';

@injectable()
export class ListCategoriesUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(): Promise<Category[]> {
        return await this.categoriesRepository.findAll();
    }
}
