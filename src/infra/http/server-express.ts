import express from 'express';
import 'express-async-errors';

import { router } from '@Routes/index';
import { Database } from '@Infra/data/database';
import { ErrorMiddleware } from '@Infra/http/middlewares/error';

export class Server {
    private port = process.env.PORT || 3333;

    start() {
        const database = new Database();
        const errorMiddleware = new ErrorMiddleware();
        database.createConnection();

        const app = express();

        app.use(express.json());
	
        app.use(router);

        app.use(errorMiddleware.handle);
	
        app.listen(this.port);
    }
}