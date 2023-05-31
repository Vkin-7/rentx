import { container } from 'tsyringe';


import { ICategoriesRepository } from '@Repositories/interfaces/ICategoriesRepository';
import { CategoriesRepository } from '@Repositories/categoriesRepository';

import { ISpecificationsRepository } from '@Repositories/interfaces/ISpecificationsRepository';
import { SpecificationsRepository } from '@Repositories/specificationsRepository';

import { IUsersRepository } from '@Repositories/interfaces/IUsersRepository';
import { UsersRepository } from '@Repositories/usersRepository';


import { ICarsRepository } from '@Infra/data/repositories/interfaces/ICarsRepository';
import { CarsRepository } from '@Infra/data/repositories/carsRepository';


import { ICarImageRepository } from '@Infra/data/repositories/interfaces/ICarImageRepository';
import { CarImageRepository } from '@Infra/data/repositories/carImageRepository';

import { IRentalsRepository } from '@Infra/data/repositories/interfaces/IRentalsRepository';
import { RentalsRepository } from '@Infra/data/repositories/rentalsRepository';


container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<ICarsRepository>(
    'CarsRepository',
    CarsRepository
);

container.registerSingleton<ICarImageRepository>(
    'CarImageRepository',
    CarImageRepository
);

container.registerSingleton<IRentalsRepository>(
    'RentalsRepository',
    RentalsRepository
);