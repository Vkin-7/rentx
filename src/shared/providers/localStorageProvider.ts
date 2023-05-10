import fs from 'node:fs';
import { resolve } from 'node:path';

import { IStorageProvider } from './interfaces/IStorageProvider';
import upload from '@Services/upload';

export class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file),
            resolve(`${upload.tmpFolder}/${folder}`, file)
        );

        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

        try {
            await fs.promises.stat(filename);
        } catch(e) {
            console.log('deu ruim');
            return;
        }

        fs.promises.unlink(filename);
    }
}