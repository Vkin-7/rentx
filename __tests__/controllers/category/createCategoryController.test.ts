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
let refresh_token = '';

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

        const responseToken =  await request(app)
            .post('/sessions')
            .send({
                email: 'admin@rentx.com',
                password: 'admin'
            });
        
        refresh_token = responseToken.body.refresh_token;
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
    });

    it('Should be able to create a new category', async () => {
        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Category supertest',
                description: 'Category supertest'
            })
            .set({
                Authorization: `Bearer ${refresh_token}` 
            });

        expect(response.status).toBe(201);
    });


    it('Should not be able to create a new category with name exists', async () => {
        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Category supertest',
                description: 'Category supertest'
            })
            .set({
                Authorization: `Bearer ${refresh_token}` 
            });

        expect(response.status).toBe(400);
    });
});