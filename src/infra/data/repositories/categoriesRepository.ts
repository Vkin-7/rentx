import { ICreateCategoryDTO } from '@DTO/category/ICreateCategoryDTO';
import { ICategoriesRepository } from './interfaces/ICategoriesRepository';
import { Category } from '@Infra/data/entities/Category';
import { Repository } from 'typeorm';
import { AppDataSource } from '@Infra/data/database/data-source';

export class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }

    async create(data: ICreateCategoryDTO): Promise<boolean> {
        const category = new Category(
            data.name,
            data.description,
        );
 
        const result = await this.repository.save(category);

        return result !== null;
    }

    async findAll(): Promise<Category[]> {
        return await this.repository.find();
    }

    async findByName(name: string): Promise<Category | null> {
        return await this.repository.findOneBy({ name });
    } 
}