import { ICreateRentalDTO } from '@DTO/rental/ICreateRentalDTO';
import { Rental } from '@Entities/Rental';
import { IRentalRepository } from '@Infra/data/repositories/interfaces/IRentalRepository';
import { AppError } from '@Shared/errors/AppError';
import { IDateProvider } from '@Shared/providers/interfaces/IDateProvider';

export class CreateRentalUseCase {
    private MINIMUM_HOUR_TO_RENT = 24;

    constructor(
        private dateProvider: IDateProvider,
        private rentalRepository: IRentalRepository
    ){}

    async execute(data: ICreateRentalDTO): Promise<Rental> {
        const {
            user_id, 
            car_id, 
            expected_return_date
        } = data;

        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError('Car is unavailable');
        }

        const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id);

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
        

        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        return rental;
    }
}