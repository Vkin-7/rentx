import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from '@Application/useCases/car/createCarUseCase';


export class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        } = request.body;

        const createCarUseCase = container.resolve(CreateCarUseCase); 

        const car = await createCarUseCase.execute({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand, 
            category_id
        });

        return car ? response.status(201).json(car) : response.status(500).send();
    }
}