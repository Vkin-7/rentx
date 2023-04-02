import { inject, injectable } from 'tsyringe';

import { IUploadCarImagesDTO } from '@DTO/car/IUploadCarImagesDTO';
import { ICarImageRepository } from '@Infra/data/repositories/interfaces/ICarImageRepository';

@injectable()
export class UploadCarImagesUseCase {
    constructor(
        @inject('CarImageRepository')
        private carImageRepository: ICarImageRepository
    ){}

    async execute({ car_id, images_name }: IUploadCarImagesDTO): Promise<void> {
        const carImages = images_name.map(image => this.carImageRepository.create(car_id, image));

        await Promise.all(carImages);

        // return carImages;
    }
}