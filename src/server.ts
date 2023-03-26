import 'reflect-metadata';
import '@Shared/container';

import * as dotenv from 'dotenv';
import { Server } from '@Infra/http/server-express';

dotenv.config();

const server = new Server();

server.start();