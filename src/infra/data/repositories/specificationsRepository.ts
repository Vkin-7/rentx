import { ICreateSpecificationDTO } from '@DTO/specification/ICreateSpecificationDTO';
import { ISpecificationsRepository } from './interfaces/ISpecificationsRepository';
import { Specification } from '@Infra/data/entities/Specification';
import { AppDataSource } from '@Infra/data/database/data-source';
import { In, Repository } from 'typeorm';

export class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }

    async create(data: ICreateSpecificationDTO): Promise<Specification> {
        const category = new Specification(
            data.name,
            data.description,
        );
    
        return await this.repository.save(category);
    }

    async findByName(name: string): Promise<Specification | null> {
        const specification = await this.repository.findOneBy({ name });

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.repository.findBy({ id: In(ids) });
    }
}