import { ICreateCategoryDTO } from '@DTO/category/ICreateCategoryDTO';
import { Category } from '@Infra/data/entities/Category';

export interface ICategoriesRepository {
    create(data: ICreateCategoryDTO): Promise<boolean>;
    findAll(): Promise<Category[]>;
    findByName(name: string): Promise<Category | null>;
} 