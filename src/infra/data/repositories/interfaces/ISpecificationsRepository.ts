import { ICreateSpecificationDTO } from '@DTO/specification/ICreateSpecificationDTO';
import { Specification } from '@Infra/data/entities/Specification';

export interface ISpecificationsRepository {
    create(data: ICreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification | null>;
    findByIds(ids: string[]): Promise<Specification[]>;
} 