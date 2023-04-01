import { ICreateCarDTO } from '@DTO/car/ICreateCarDTO';
import { Car } from '@Entities/Car';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import { ICarsRepository } from './interfaces/ICarsRepository';

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = AppDataSource.getRepository(Car);
    }


    async create(data: ICreateCarDTO): Promise<Car> {
        const car = new Car(
            data.name,
            data.description,
            data.daily_rate,
            data.license_plate,
            data.final_amount,
            data.brand, 
            data.category_id,
        );
        return await this.repository.save(car);
    }

    async findByLicensePlate(license_plate: string): Promise<Car | null> {
        return await this.repository.findOneBy({ license_plate });
    }

}