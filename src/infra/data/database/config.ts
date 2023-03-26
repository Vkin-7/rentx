import { Category } from '@Infra/data/entities/Category';
import { Specification } from '@Infra/data/entities/Specification';
import { User } from '@Infra/data/entities/User';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'docker',
    password: 'ignite',
    database: 'rentx',
    synchronize: false,
    logging: false,
    entities: [
        Category,
        Specification,
        User
    ],
    subscribers: [],
    migrations: ['./src/infra/data/database/migrations/*.ts']
});
