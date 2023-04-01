import { ListCarsUseCase } from '@Application/useCases/car/listCarsUseCase';
import { CarsRepositoryInMemory } from '@Tests/infra/data/repositories/in-memory/carsRepositoryInMemory';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it('Should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            'name': 'Car-01',
            'description': 'car description',
            'daily_rate': 110,
            'license_plate': 'DEF-1234',
            'final_amount': 100,
            'brand': 'car brand',
            'category_id': 'category_id'
        });

        const cars = await listCarsUseCase.execute();

        expect(cars).toContain(car);
    });

    it('Should be able to list available cars by category', async () => {
        const car = await carsRepositoryInMemory.create({
            'name': 'Car-01-test',
            'description': 'car description',
            'daily_rate': 110,
            'license_plate': 'DEF-1234',
            'final_amount': 100,
            'brand': 'car brand',
            'category_id': 'category_id'
        });

        const cars = await listCarsUseCase.execute({
            name: 'Car-01-test'
        });


        expect(cars).toContain(car);
    });
});