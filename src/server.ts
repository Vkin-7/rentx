import 'reflect-metadata';

import 'dotenv/config';

import '@CrossCutting/ioc/index';

import { Server } from '@Infra/http/server-express';



const server = new Server();

export const app = server.getApp();

server.start();