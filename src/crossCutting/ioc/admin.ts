import { container } from 'tsyringe';


import { IEnsureAdmin } from '@Infra/http/middlewares/interfaces/IEnsureAdmin';
import { EnsureAdmin } from '@Infra/http/middlewares/ensureAdmin';


container.registerSingleton<IEnsureAdmin>(
    'EnsureAdmin',
    EnsureAdmin
);