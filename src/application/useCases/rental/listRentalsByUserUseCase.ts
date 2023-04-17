import { Rental } from '@Entities/Rental';
import { IRentalsRepository } from '@Infra/data/repositories/interfaces/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListRentalByUserUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        return await this.rentalsRepository.findByUserId(user_id);
    }
}