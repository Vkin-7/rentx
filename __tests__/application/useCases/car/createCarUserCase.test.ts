import 'reflect-metadata';

import { CreateCarUseCase } from '@Application/useCases/car/createCarUseCase';

let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
    beforeEach(() => {
        createCarUseCase = new CreateCarUseCase();
    });

    it('Should be able to create a new car', async () => {
        await createCarUseCase.execute();
    });
});