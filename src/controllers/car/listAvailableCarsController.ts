import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from '@Application/useCases/car/listAvailableCarsUseCase';

export class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, name, category_id } = request.query;

        const listAvailableCarsUseCase = container.resolve(
            ListAvailableCarsUseCase
        );

        const cars = await listAvailableCarsUseCase.execute({
            brand: brand?.toString(),
            name: name?.toString(),
            category_id: category_id?.toString()
        });

        return response.json(cars);
    }
}