import { ICreateSpecificationDTO } from '@DTO/specification/ICreateSpecificationDTO';
import { ISpecificationsRepository } from './interfaces/ISpecificationsRepository';
import { Specification } from '@Infra/data/entities/Specification';
import { AppDataSource } from '@Infra/data/database/typeorm';
import { Repository } from 'typeorm';

export class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }

    async create(data: ICreateSpecificationDTO): Promise<boolean> {
        const category = new Specification(
            data.name,
            data.description,
        );
    
        const result = await this.repository.save(category);
 
        return result !== null;
    }

    async getByName(name: string): Promise<Specification | null> {
        const specification = await this.repository.findOneBy({ name });

        return specification;
    }
}