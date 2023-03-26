import { ICreateSpecificationDTO } from '@DTO/specification/ICreateSpecificationDTO';
import { Specification } from '@Infra/data/entities/Specification';

export interface ISpecificationsRepository {
    create(data: ICreateSpecificationDTO): Promise<boolean>;
    getByName(name: string): Promise<Specification | null>;
} 