import { SignOptions } from 'jsonwebtoken';

export interface IAuthProvider {
    generateToken(
        payload: string | object | Buffer, 
        options: SignOptions | undefined
    ): string;
    generateRefreshToken(
        payload: string | object | Buffer, 
        options: SignOptions | undefined
    ): string;
}