import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { UserSeeder } from './UserSeeder';

interface IOptions {
    host: string;
}

export class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const { options } = dataSource;
        const newOptions = options as IOptions;
        newOptions.host = 'database_ignite';

        dataSource.setOptions(newOptions);

        await runSeeder(dataSource, UserSeeder);
    }
}