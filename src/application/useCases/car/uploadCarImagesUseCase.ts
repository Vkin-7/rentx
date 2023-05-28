import { inject, injectable } from 'tsyringe';

import { IUploadCarImagesDTO } from '@DTO/car/IUploadCarImagesDTO';
import { ICarImageRepository } from '@Infra/data/repositories/interfaces/ICarImageRepository';
import { IStorageProvider } from '@Shared/providers/interfaces/IStorageProvider';

@injectable()
export class UploadCarImagesUseCase {
    constructor(
        @inject('CarImageRepository')
        private carImageRepository: ICarImageRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ){}

    async execute({ car_id, images_name }: IUploadCarImagesDTO): Promise<void> {
        const tasks: Promise<any>[] = [];

        images_name.map(image => {
            tasks.push(this.carImageRepository.create(car_id, image));
            tasks.push(this.storageProvider.save(image, 'cars'));
        });

        await Promise.all(tasks);

        // return carImages;
    }
}