import { Category } from '@Infra/data/entities/Category';
import { ICreateCategoryDTO } from '@DTO/category/ICreateCategoryDTO';
import { ICategoriesRepository } from '@Infra/data/repositories/interfaces/ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async create(data: ICreateCategoryDTO): Promise<boolean> {
        const category = new Category(
            data.name,
            data.description
        );

        this.categories.push(category);
        
        return this.categories.includes(category);
    }

    async findAll(): Promise<Category[]> {
        return this.categories;
    }

    async findByName(name: string): Promise<Category | null> {
        return this.categories.find(category => category.name === name) || null;
    }

}