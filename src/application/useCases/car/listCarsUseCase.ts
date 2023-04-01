import { IListCarsDTO } from '@DTO/car/IListCarsDTO';
import { Car } from '@Entities/Car';
import { ICarsRepository } from '@Infra/data/repositories/interfaces/ICarsRepository';

export class ListCarsUseCase {
    constructor(
        private carsRepository: ICarsRepository
    ){}
    async execute(data?: IListCarsDTO): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            data?.brand, 
            data?.category_id, 
            data?.name
        );
        
        return cars;
    }
}