import express from 'express';
import 'express-async-errors';

import { router } from '@Routes/index';
import { Database } from '@Infra/data/database';
import { ErrorMiddleware } from '@Infra/http/middlewares/error';

export class Server {
    private port = process.env.PORT || 3333;
    public app = express();

    start() {
        const database = new Database();
        const errorMiddleware = new ErrorMiddleware();
        database.createConnection();

        this.app.use(express.json());
	
        this.app.use(router);

        this.app.use(errorMiddleware.handle);
	
        this.app.listen(this.port);
    }

    getApp() {
        return this.app;
    }
}