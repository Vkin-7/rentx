import { Repository } from 'typeorm';

import { ICreateUserDTO } from '@DTO/user/ICreateUserDTO';
import { AppDataSource } from '@Infra/data/database/typeorm';
import { IUsersRepository } from './interfaces/IUsersRepository';
import { User } from '@Infra/data/entities/User';

export class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async update(entity: User): Promise<User> {
        return await this.repository.save(entity);
    }

    async findById(id: string): Promise<User | null> {
        return await this.repository.findOneBy({ id });
    }
    
    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({ email });
    }

    async create(data: ICreateUserDTO): Promise<boolean> {
        const user = new User(
            data.name,
            data.email,
            data.password,
            data.driver_license
        );
 
        const result = await this.repository.save(user);

        return result !== null;
    }
}