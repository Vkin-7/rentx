import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryUseCase } from '@UseCases/category/createCategoryUseCase';


export class CreateCategoryController {
    async handle(request: Request, response: Response) {
        const { name, description } = request.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase); 
        const result = await createCategoryUseCase.execute({ name, description });

        return result ? response.status(201).send() : response.status(500).send();
    }
} 