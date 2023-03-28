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
    entities: ['./src/infra/data/entities/**/*.ts'],
    subscribers: [],
    migrations: ['./src/infra/data/database/migrations/*.ts']
});
