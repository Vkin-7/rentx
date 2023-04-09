import { ICreateRentalDTO } from '@DTO/rental/ICreateRentalDTO';
import { Rental } from '@Entities/Rental';

export interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental | null>;
    findOpenRentalByUser(user_id: string): Promise<Rental | null>;
    create(data: ICreateRentalDTO): Promise<Rental>;
}