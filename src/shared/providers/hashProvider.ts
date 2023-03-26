import { createHash } from 'node:crypto';
import { IHashProvider } from './interfaces/IHashProvider';

export class HashProvider implements IHashProvider {
    compareHash(value: string, hashedValue: string): boolean {
        const newHash = this.generateHash(value);

        return hashedValue === newHash;
    }

    generateHash(value: string): string {
        return createHash('sha256').update(value).digest('hex');
    }
}