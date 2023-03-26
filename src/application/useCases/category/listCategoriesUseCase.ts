import { Category } from '@Infra/data/entities/Category';
import { CategoriesRepository } from '@Repositories/categoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListCategoriesUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: CategoriesRepository
    ) {}

    async execute(): Promise<Category[]> {
        return await this.categoriesRepository.getAll();
    }
}
