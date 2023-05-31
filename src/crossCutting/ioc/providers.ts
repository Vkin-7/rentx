import { container } from 'tsyringe';


import { HashProvider } from '../../shared/providers/hashProvider';
import { IHashProvider } from '../../shared/providers/interfaces/IHashProvider';

import { AuthProvider } from '../../shared/providers/authProvider';
import { IAuthProvider } from '../../shared/providers/interfaces/IAuthProvider';

import { IDateProvider } from '../../shared/providers/interfaces/IDateProvider';
import { DateProvider } from '../../shared/providers/dateProvider';

import { IMailProvider } from '../../shared/providers/interfaces/IMailProvider';
import { EtherealMailProvider } from '../../shared/providers/mailProvider/etherealMailProvider';

import { IStorageProvider } from '../../shared/providers/interfaces/IStorageProvider';
import { LocalStorageProvider } from '../../shared/providers/localStorageProvider';
import { S3StorageProvider } from '../../shared/providers/s3StorageProvider';
import { SESMailProvider } from '@Shared/providers/mailProvider/sesMailProvider';

container.registerSingleton<IAuthProvider>(
    'AuthProvider',
    AuthProvider
);

container.registerSingleton<IHashProvider>(
    'HashProvider',
    HashProvider
);

container.registerSingleton<IDateProvider>(
    'DateProvider',
    DateProvider
);

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider)
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    mailProvider[process.env.MAIL_PROVIDER]
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    diskStorage[process.env.DISK]
);
