import { AppDataSource } from './data-source';


interface IOptions {
    host: string;
    database: any;
}

export class Database {
    dataSource = AppDataSource;

    async createConnection(host = 'database_ignite') {
        const { options } = this.dataSource;
        const newOptions = options as IOptions;
        newOptions.host = process.env.NODE_ENV === 'development' ? 'localhost' : host;
        newOptions.database = process.env.NODE_ENV === 'development' ? 'rentx_test' : options.database;

        this.dataSource.setOptions(newOptions);
        return this.dataSource.initialize();
    }
}
