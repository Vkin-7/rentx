export interface IHashProvider {
    generateHash(value: string): string;
    compareHash(value1: string, value2: string): boolean;
}