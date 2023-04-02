import { CarImage } from '@Entities/CarImage';

export interface ICarImageRepository {
    create(
        car_id: string,
        image_name: string
    ): Promise<CarImage>
}