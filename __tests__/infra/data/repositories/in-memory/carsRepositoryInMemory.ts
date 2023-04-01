import { ICreateCarDTO } from '@DTO/car/ICreateCarDTO';
import { Car } from '@Entities/Car';
import { ICarsRepository } from '@Infra/data/repositories/interfaces/ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
    private cars: Car[] = [];
    
    async findByLicensePlate(license_plate: string): Promise<Car | null> {
        return this.cars.find(x => x.license_plate === license_plate) || null;
    }
    
    async create(data: ICreateCarDTO): Promise<Car> {
        const car = new Car(
            data.name,
            data.description,
            data.daily_rate,
            data.license_plate,
            data.final_amount,
            data.brand,
            data.category_id
        );

        this.cars.push(car);

        return car;
    }

    async findAvailable(
        brand?: string, 
        category_id?: string, 
        name?: string
    ): Promise<Car[]> {
        const filter = (brand && 'brand') || (category_id && 'category_id') || (name && 'name'); 
        const filters = {
            brand, category_id, name
        };

        return this.cars
            .filter(car => {
                if (car.available) {
                    return filter ? car[filter] == filters[filter] : car;
                }
            })
            .filter(car => filter ? car[filter] == filters[filter] : car);
    }

}