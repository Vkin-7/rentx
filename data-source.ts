import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from '@Infra/data/database/seeds/MainSeeder';


const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'docker',
    password: 'ignite',
    database: 'rentx',
    synchronize: false,
    logging: false,
    entities: ['./src/infra/data/entities/**/*.{ts,js}'],
    migrations: ['./src/infra/data/database/migrations/*.{ts,js}'],
    seeds: [MainSeeder]
};

export const AppDataSource = new DataSource(options);
