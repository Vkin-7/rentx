import 'reflect-metadata';

import { CreateCarUseCase } from '@Application/useCases/car/createCarUseCase';
import { CarsRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/carsRepositoryInMemory';
import { AppError } from '@Shared/errors/AppError';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it('Should be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            name: 'car name',
            description: 'car description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'car brand',
            category_id: 'category'
        });

        expect(car).toHaveProperty('id');
    });

    it('Should not be able to create a car with exists license plate', async () => {
        await createCarUseCase.execute({
            name: 'car name 1',
            description: 'car description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'car brand',
            category_id: 'category'
        });

        await expect(
            createCarUseCase.execute({
                name: 'car name 2',
                description: 'car description',
                daily_rate: 100,
                license_plate: 'ABC-1234',
                fine_amount: 60,
                brand: 'car brand',
                category_id: 'category'
            })
        ).rejects.toEqual(new AppError('Car already exists!'));
    });

    it('Should be able to create a car with available true by default', async () => {
        const car = await createCarUseCase.execute({
            name: 'car name',
            description: 'car description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'car brand',
            category_id: 'category',
        });

        expect(car.available).toBe(true);
    });
});