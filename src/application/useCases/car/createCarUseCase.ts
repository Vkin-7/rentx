import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@DTO/car/ICreateCarDTO';
import { Car } from '@Entities/Car';
import { ICarsRepository } from '@Infra/data/repositories/interfaces/ICarsRepository';
import { AppError } from '@Shared/errors/AppError';


@injectable()
export class CreateCarUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ){}

    async execute(data: ICreateCarDTO): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(data.license_plate);

        if (carAlreadyExists) {
            throw new AppError('Car already exists!');
        }

        return await this.carsRepository.create({ ...data });
    }
}