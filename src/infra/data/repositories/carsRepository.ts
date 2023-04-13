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
        const car =  this.repository.create({ ...data });

        return await this.repository.save(car);
    }

    async findById(id: string): Promise<Car | null> {
        return await this.repository.findOneBy({ id });
    }

    async findByLicensePlate(license_plate: string): Promise<Car | null> {
        return await this.repository.findOneBy({ license_plate });
    }

    async findAvailable(
        brand?: string, 
        category_id?: string, 
        name?: string
    ): Promise<Car[]> {

        const carsQuery = await this.repository
            .createQueryBuilder('c')
            .where('available = :available', { available: true });

        const filter = (brand && 'brand') || (category_id && 'category_id') || (name && 'name'); 

        if (filter) {
            const filters = {
                brand, category_id, name
            };
    
            carsQuery.andWhere(`c.${filter} = :filter`, { filter: filters[filter] });
        }


        return await carsQuery.getMany();
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update(Car)
            .set({ available })
            .where('id = :id', { id })
            .execute();
    }

}