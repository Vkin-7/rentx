import { ICreateCarDTO } from '@DTO/car/ICreateCarDTO';
import { Car } from '@Entities/Car';

export interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car | null>;
    findAvailable(
        brand?: string, 
        category_id?: string, 
        name?: string
    ): Promise<Car[]>;
}