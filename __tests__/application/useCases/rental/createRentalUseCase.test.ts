import { CreateRentalUseCase } from '@Application/useCases/rental/createRentalUseCase';
import { AppError } from '@Shared/errors/AppError';
import { RentalRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/rentalRepositoryInMemory';
import dayjs from 'dayjs';

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
    const tomorrow =  dayjs().add(1, 'day').toDate(); 

    beforeEach(() => {
        rentalRepositoryInMemory = new RentalRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
    });

    it('Should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '54321',
            expected_return_date: tomorrow
        });


        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('Should not be able to create a new rental, if user already is renting a car', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '54321',
                expected_return_date: tomorrow
            });
    
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '12345',
                expected_return_date: tomorrow
            });
        }).rejects.toBeInstanceOf(AppError);
        
    });

    it('Should not be able to create a new rental if car is already rented', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '54321',
                expected_return_date: tomorrow
            });

            await createRentalUseCase.execute({
                user_id: '54321',
                car_id: '54321',
                expected_return_date: tomorrow
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create a new rental with invalid return time', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '54321',
                expected_return_date: dayjs().toDate()
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});