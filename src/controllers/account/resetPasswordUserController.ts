import { ResetPasswordUserUseCase } from '@Application/useCases/account/resetPasswordUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ResetPasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);

        await resetPasswordUserUseCase.execute(String(token), password);

        return response.send();
    }
}