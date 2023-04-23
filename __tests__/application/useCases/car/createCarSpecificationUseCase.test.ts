import 'reflect-metadata';

import { CreateCarSpecificationUseCase } from '@Application/useCases/car/createCarSpecificationUseCase';
import { AppError } from '@Shared/errors/AppError';
import { CarsRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/carsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/specificationsRepositoryInMemory';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();

        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it('Should be able to add a new specification to a car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'car name',
            brand: 'car brand',
            description: 'car description',
            fine_amount: 0,
            daily_rate: 0,
            license_plate: '000-AAAA',
            category_id: 'category id'
        });

        const specification = await specificationsRepositoryInMemory.create({ 
            name: 'specification name', 
            description: 'specification description' 
        });

        const specifications_id = [specification.id];

        const result = await createCarSpecificationUseCase.execute({ 
            car_id: car.id, 
            specifications_id 
        });

        expect(result.specifications).toContain(specification);
    }); 

    it('Should not be able to add a new specification to a non-existent car', async () => {
        const car_id = '12345';
        const specifications_id = ['54321'];

        await expect(
            createCarSpecificationUseCase.execute({ car_id, specifications_id })
        ).rejects.toEqual(new AppError('Car does not exists!'));
    }); 
});