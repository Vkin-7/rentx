import 'reflect-metadata';
import request from 'supertest';
import { randomUUID } from 'node:crypto';

import { app } from '../../../src/server';
import { Database } from '@Infra/data/database';
import { DataSource } from 'typeorm';
import { HashProvider } from '@Shared/providers/hashProvider';


let dataSource: DataSource;
const database = new Database();
const hashProvider = new HashProvider();

describe('Create category controller', () => {

    beforeAll(async () => {
        dataSource = await database.createConnection();
        dataSource.runMigrations();

        const id = randomUUID();
        const password = hashProvider.generateHash('admin');

        await dataSource.query(`
            INSERT INTO user (id, name, email, password, isAdmin, created_at, driver_license) 
            VALUES 
            ('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXX')
        `);
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
    });

    it('Should be able to create a new category', async () => {
        const responseToken =  await request(app)
            .post('/sessions')
            .send({
                email: 'admin@rentx.com',
                password: 'admin'
            });
        
        const { token } = responseToken.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Category supertest',
                description: 'Category supertest'
            })
            .set({
                Authorization: `Bearer ${token}` 
            });

        expect(response.status).toBe(201);
    });
});