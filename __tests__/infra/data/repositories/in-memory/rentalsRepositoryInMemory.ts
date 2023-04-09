import { ICreateRentalDTO } from '@DTO/rental/ICreateRentalDTO';
import { Rental } from '@Entities/Rental';
import { IRentalsRepository } from '@Repositories/interfaces/IRentalsRepository';

export class RentalsRepositoryInMemory implements IRentalsRepository {
    private rentals: Rental[] = [];
    
    async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
        return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date) || null;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date) || null;
    }

    async create(data: ICreateRentalDTO): Promise<Rental> {
        const {
            car_id,
            user_id,
            expected_return_date
        } = data;

        const rental = new Rental(
            car_id, 
            user_id,
            expected_return_date,
            new Date(),
            0
        );

        this.rentals.push(rental);

        return rental;
    }
}