import { ICreateRentalDTO } from '@DTO/rental/ICreateRentalDTO';
import { Rental } from '@Entities/Rental';
import { ICarsRepository } from '@Infra/data/repositories/interfaces/ICarsRepository';
import { IRentalsRepository } from '@Infra/data/repositories/interfaces/IRentalsRepository';
import { AppError } from '@Shared/errors/AppError';
import { IDateProvider } from '@Shared/providers/interfaces/IDateProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateRentalUseCase {
    private MINIMUM_HOUR_TO_RENT = 24;

    constructor(
        @inject('DateProvider')
        private dateProvider: IDateProvider,
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ){}

    async execute(data: ICreateRentalDTO): Promise<Rental> {
        const {
            user_id, 
            car_id, 
            expected_return_date
        } = data;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError('Car is unavailable');
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError('There`s a rental in progress for user!');
        }

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        if (compare < this.MINIMUM_HOUR_TO_RENT) {
            throw new AppError('Invalid return time');
        }
        

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}