import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUseCase } from '@UseCases/specification/createSpecificationUseCase';


export class CreateSpecificationController {
    async handle(request: Request, response: Response) {
        const { name, description } = request.body;

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase); 
        const result = await createSpecificationUseCase.execute({ name, description });

        return result ? response.status(201).send() : response.status(400).send();   
    }
}