import { ICreateUserDTO } from '@DTO/user/ICreateUserDTO';
import { User } from '@Infra/data/entities/User';

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<boolean>;
    update(entity: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
} 