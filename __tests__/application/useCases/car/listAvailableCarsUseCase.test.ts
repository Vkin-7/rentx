import 'reflect-metadata';

import { ListAvailableCarsUseCase } from '@Application/useCases/car/listAvailableCarsUseCase';
import { CarsRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/carsRepositoryInMemory';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it('Should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            'name': 'Car-01',
            'description': 'car description',
            'daily_rate': 110,
            'license_plate': 'DEF-1234',
            'fine_amount': 100,
            'brand': 'car brand',
            'category_id': 'category_id'
        });

        const cars = await listAvailableCarsUseCase.execute();

        expect(cars).toContain(car);
    });

    it('Should be able to list available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            'name': 'Car-01-test',
            'description': 'car description',
            'daily_rate': 110,
            'license_plate': 'DEF-1234',
            'fine_amount': 100,
            'brand': 'car brand',
            'category_id': 'category_id'
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: 'Car-01-test'
        });


        expect(cars).toContain(car);
    });

    it('Should be able to list available cars by category id', async () => {
        const car = await carsRepositoryInMemory.create({
            'name': 'Car-01-test',
            'description': 'car description',
            'daily_rate': 110,
            'license_plate': 'DEF-1234',
            'fine_amount': 100,
            'brand': 'car brand',
            'category_id': 'category_id'
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: 'category_id'
        });


        expect(cars).toContain(car);
    });

    it('Should be able to list available cars by category id', async () => {
        const car = await carsRepositoryInMemory.create({
            'name': 'Car-01-test',
            'description': 'car description',
            'daily_rate': 110,
            'license_plate': 'DEF-1234',
            'fine_amount': 100,
            'brand': 'car brand',
            'category_id': 'category_id'
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: 'car brand'
        });


        expect(cars).toContain(car);
    });
});