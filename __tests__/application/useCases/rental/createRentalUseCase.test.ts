import 'reflect-metadata';

import dayjs from 'dayjs';

import { CreateRentalUseCase } from '@Application/useCases/rental/createRentalUseCase';
import { AppError } from '@Shared/errors/AppError';
import { DateProvider } from '@Shared/providers/dateProvider';
import { RentalsRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/rentalsRepositoryInMemory';
import { CarsRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/carsRepositoryInMemory';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
    const tomorrow =  dayjs().add(2, 'day').toDate(); 

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory =  new CarsRepositoryInMemory();
        dateProvider = new DateProvider();

        createRentalUseCase = new CreateRentalUseCase(
            dateProvider,
            rentalsRepositoryInMemory,
            carsRepositoryInMemory
        );
    });

    it('Should be able to create a new rental', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'test',
            description: 'Car test',
            daily_rate: 100,
            license_plate: 'test',
            fine_amount: 40,
            category_id: '1234',
            brand: 'brand'
        });

        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: car.id,
            expected_return_date: tomorrow
        });


        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('Should not be able to create a new rental, if user already is renting a car', async () => {
        await rentalsRepositoryInMemory.create({
            user_id: '12345',
            car_id: '54321',
            expected_return_date: tomorrow
        });
        
        await expect(createRentalUseCase.execute({
            user_id: '12345',
            car_id: '54320',
            expected_return_date: tomorrow
        })
        ).rejects.toEqual(new AppError('There`s a rental in progress for user!'));
        
    });

    it('Should not be able to create a new rental if car is already rented', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'test',
            description: 'Car test',
            daily_rate: 100,
            license_plate: 'test',
            fine_amount: 40,
            category_id: '1234',
            brand: 'brand'
        });

        await createRentalUseCase.execute({
            user_id: '12345',
            car_id: car.id,
            expected_return_date: tomorrow
        });

        await expect(
            createRentalUseCase.execute({
                user_id: '54321',
                car_id: car.id,
                expected_return_date: tomorrow
            })
        ).rejects.toEqual(new AppError('Car is unavailable'));
    });

    it('Should not be able to create a new rental with invalid return time', async () => {
        await expect(createRentalUseCase.execute({
            user_id: '12345',
            car_id: '54321',
            expected_return_date: dayjs().toDate()
        })
        ).rejects.toEqual(new AppError('Invalid return time'));
    });
});