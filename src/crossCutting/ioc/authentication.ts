import { container } from 'tsyringe';


import { IEnsureAuthenticated } from '@Infra/http/middlewares/interfaces/IEnsureAuthenticated';
import { EnsureAuthenticated } from '@Infra/http/middlewares/ensureAuthenticated';

container.registerSingleton<IEnsureAuthenticated>(
    'EnsureAuthenticated',
    EnsureAuthenticated
);