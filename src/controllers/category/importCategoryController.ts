import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import { ImportCategoryUseCase } from '@UseCases/category/importCategoryUseCase';

@injectable()
export class ImportCategoryController {
    async handle(request: Request, response: Response) {
        const { file } = request;

        if (file) {
            const importCategoryUseCase = container.resolve(ImportCategoryUseCase); 
            importCategoryUseCase.execute(file);
        }
        return response.status(201).send();
    }
}