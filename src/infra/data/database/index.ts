import { AppDataSource } from './data-source';

export class Database {
    dataSource = AppDataSource;

    createConnection() {
        return this.dataSource.initialize();
    }
}
