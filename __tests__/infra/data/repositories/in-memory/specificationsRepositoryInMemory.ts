import { ICreateSpecificationDTO } from '@DTO/specification/ICreateSpecificationDTO';
import { Specification } from '@Entities/Specification';
import { ISpecificationsRepository } from '@Infra/data/repositories/interfaces/ISpecificationsRepository';

export class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    private specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification(
            name,
            description,
            new Date()
        );

        this.specifications.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification | null> {
        return this.specifications.find(specification => specification.name === name) || null;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter(specification => ids.includes(specification.id));
    }

}