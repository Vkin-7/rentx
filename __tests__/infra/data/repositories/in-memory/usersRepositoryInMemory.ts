import { User } from '@Infra/data/entities/User';
import { ICreateUserDTO } from '@DTO/user/ICreateUserDTO';
import { IUsersRepository } from '@Infra/data/repositories/interfaces/IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create(data: ICreateUserDTO): Promise<boolean> {
        const user = new User(
            data.name,
            data.email,
            data.password,
            data.driver_license
        );

        this.users.push(user);
        
        return this.users.includes(user);
    }

    async update(entity: User): Promise<User> {
        const userIndex = this.users.findIndex(user => user.id === entity.id);

        this.users[userIndex] = entity;

        return entity;
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null;
    }

}