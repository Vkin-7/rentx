import { inject, injectable } from 'tsyringe';

import { ICreateSpecificationDTO } from '@DTO/specification/ICreateSpecificationDTO';
import { ISpecificationsRepository } from '@Repositories/interfaces/ISpecificationsRepository';
import { AppError } from '@Shared/errors/AppError';


@injectable()
export class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute(data: ICreateSpecificationDTO) {
        const specificationAlreadyExist = await this.specificationsRepository.getByName(data.name);

        if (specificationAlreadyExist) {
            throw new AppError('Specification already exists!');
        }

        return await this.specificationsRepository.create({ ...data });

    }
}