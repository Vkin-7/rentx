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




import { HashProvider } from './providers/hashProvider';
import { IHashProvider } from './providers/interfaces/IHashProvider';

import { AuthProvider } from './providers/authProvider';
import { IAuthProvider } from './providers/interfaces/IAuthProvider';




import { IEnsureAuthenticated } from '@Infra/http/middlewares/interfaces/IEnsureAuthenticated';
import { EnsureAuthenticated } from '@Infra/http/middlewares/ensureAuthenticated';

import { IEnsureAdmin } from '@Infra/http/middlewares/interfaces/IEnsureAdmin';
import { EnsureAdmin } from '@Infra/http/middlewares/ensureAdmin';



import { InternalFile } from './utils/file';

//REPOSITORIES
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


// PROVIDERS
container.registerSingleton<IAuthProvider>(
    'AuthProvider',
    AuthProvider
);

container.registerSingleton<IHashProvider>(
    'HashProvider',
    HashProvider
);



// AUTHENTICATION
container.registerSingleton<IEnsureAuthenticated>(
    'EnsureAuthenticated',
    EnsureAuthenticated
);

// ADMIN
container.registerSingleton<IEnsureAdmin>(
    'EnsureAdmin',
    EnsureAdmin
);

// Utils
container.registerSingleton(
    'InternalFile',
    InternalFile
);