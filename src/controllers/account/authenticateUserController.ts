import { AuthenticateUserUseCase } from '@Application/useCases/account/authenticateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

        const result = await authenticateUserUseCase.execute({ email, password });

        return result ? response.send(result) : response.status(500).send(); 
    }
}