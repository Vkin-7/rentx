import { inject, injectable } from 'tsyringe';

import { IDevolutionRental } from '@Domain/dto/rental/IDevolutionRentalDTO';
import { IRentalsRepository } from '@Infra/data/repositories/interfaces/IRentalsRepository';
import { ICarsRepository } from '@Infra/data/repositories/interfaces/ICarsRepository';
import { AppError } from '@Shared/errors/AppError';
import { IDateProvider } from '@Shared/providers/interfaces/IDateProvider';
import { Rental } from '@Entities/Rental';

@injectable()
export class DevolutionRentalUseCase {
    constructor(
        @inject('DateProvider')
        private dateProvider: IDateProvider,
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    private dateNow = this.dateProvider.dateNow();
    private MINIMUN_DAILY = 1;

    async execute({ id, user_id }: IDevolutionRental): Promise<Rental> {
        const rentalTask = this.rentalsRepository.findById(id);
        const carTask = this.carsRepository.findById(id);

        const [ rental, car ] = await Promise.all([
            rentalTask, 
            carTask
        ]);


        if (!rental) {
            throw new AppError('Rental does not exists!');
        }


        rental.end_date = this.dateNow;
        rental.total = this.calculateTotal(
            rental.start_date,
            rental.expected_return_date,
            (car?.final_amount || 0),
            (car?.daily_rate || 0)
        );

        await Promise.all([
            this.rentalsRepository.create(rental),
            this.carsRepository.updateAvailable(id, true)
        ]);

        return rental;
    }

    private calculateDailyAmount(start_date: Date): number {
        let dailyAmount = this.dateProvider.compareInDays(
            start_date,
            this.dateNow
        );

        if (dailyAmount <= 0) {
            dailyAmount = this.MINIMUN_DAILY;
        }

        return dailyAmount;
    }

    private calculateTotal(
        start_date: Date,
        expected_return_date: Date, 
        final_amount: number,
        daily_rate: number
    ): number {
        const delayDays = this.dateProvider.compareInDays(
            this.dateNow,
            expected_return_date
        );

        const dailyAmount = this.calculateDailyAmount(start_date);

        let total = 0;

        if (delayDays > 0) {
            const calculate_fine = delayDays * final_amount;
            total = calculate_fine;
        }

        total += dailyAmount * daily_rate;

        return total;
    }
}