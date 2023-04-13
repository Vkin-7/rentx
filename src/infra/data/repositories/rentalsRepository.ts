import { IsNull, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@DTO/rental/ICreateRentalDTO';
import { Rental } from '@Entities/Rental';
import { IRentalsRepository } from './interfaces/IRentalsRepository';
import { AppDataSource } from '../database/data-source';

export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = AppDataSource.getRepository(Rental);
    }

    async findById(id: string): Promise<Rental | null> {
        return await this.repository.findOneBy({ id });
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
        return await this.repository.findOneBy({ car_id, end_date: IsNull() });
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
        return await this.repository.findOneBy({ user_id, end_date: IsNull() });
    }
    
    async create(data: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({ ...data });

        return await this.repository.save(rental);
    }

}