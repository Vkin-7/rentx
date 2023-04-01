import { randomUUID } from 'node:crypto';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { HashProvider } from '@Shared/providers/hashProvider';
import { User } from '@Entities/User';

export class UserSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(User);

        const id = randomUUID();

        const hashProvider = new HashProvider();
        const password = hashProvider.generateHash('banana');

        const user = {
            id,
            name: 'admin',
            email: 'admin@rentx.com',
            password,
            isAdmin: true,
            created_at: new Date()
        };

        const newUser = repository.create(user);
        await repository.save(newUser);
    }
}
