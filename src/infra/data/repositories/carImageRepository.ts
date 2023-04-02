import { CarImage } from '@Entities/CarImage';
import { ICarImageRepository } from './interfaces/ICarImageRepository';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/data-source';

export class CarImageRepository implements ICarImageRepository {
    private repository: Repository<CarImage>; 
    
    constructor() {
        this.repository = AppDataSource.getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = await this.repository.create({ 
            car_id, 
            image_name
        });
        const entity = await this.repository.save(carImage);

        return entity;
    }

}