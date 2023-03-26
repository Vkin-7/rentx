import { container } from 'tsyringe';

import { ICategoriesRepository } from '@Repositories/interfaces/ICategoriesRepository';
import { CategoriesRepository } from '@Repositories/categoriesRepository';

import { ISpecificationsRepository } from '@Repositories/interfaces/ISpecificationsRepository';
import { SpecificationsRepository } from '@Repositories/specificationsRepository';

import { IUsersRepository } from '@Repositories/interfaces/IUsersRepository';
import { UsersRepository } from '@Repositories/usersRepository';



import { HashProvider } from './providers/hashProvider';
import { IHashProvider } from './providers/interfaces/IHashProvider';

import { AuthProvider } from './providers/authProvider';
import { IAuthProvider } from './providers/interfaces/IAuthProvider';




import { IEnsureAuthenticated } from '@Infra/http/middlewares/interfaces/IEnsureAuthenticated';
import { EnsureAuthenticated } from '@Infra/http/middlewares/ensureAuthenticated';




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

// Utils
container.registerSingleton(
    'InternalFile',
    InternalFile
);