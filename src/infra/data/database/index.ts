import { AppDataSource } from './data-source';


interface IOptions {
    host: string;
}

export class Database {
    dataSource = AppDataSource;

    createConnection() {
        const { options } = this.dataSource;
        const newOptions = options as IOptions;
        newOptions.host = 'database_ignite';

        this.dataSource.setOptions(newOptions);
        return this.dataSource.initialize();
    }
}
