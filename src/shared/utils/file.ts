import fs from 'node:fs';

export class InternalFile {

    async delete(fileName: string) {
        try {
            await fs.promises.stat(fileName);
        } catch {
            return;
        }

        fs.promises.unlink(fileName);
    } 
}