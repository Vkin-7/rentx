import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '@UseCases/user/createUserUseCase';


export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { 
            name,
            email,
            password,
            driver_license
        } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase); 
        const result = await createUserUseCase.execute({ 
            name, 
            email, 
            password, 
            driver_license 
        });

        return result ? response.status(201).send() : response.status(500).send();
    }
} 