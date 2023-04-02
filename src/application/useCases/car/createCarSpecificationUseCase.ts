import { inject, injectable } from 'tsyringe';

import { ICreateCarSpecification } from '@DTO/car/ICreateCarSpecificationDTO';
import { ICarsRepository } from '@Infra/data/repositories/interfaces/ICarsRepository';
import { AppError } from '@Shared/errors/AppError';
import { ISpecificationsRepository } from '@Infra/data/repositories/interfaces/ISpecificationsRepository';
import { Car } from '@Entities/Car';

@injectable()
export class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ){}
    async execute({ car_id, specifications_id }: ICreateCarSpecification): Promise<Car> {
        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError('Car does not exists!');
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id);

        car.specifications = specifications;

        this.carsRepository.create(car);

        return car;
    }
}