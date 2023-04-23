import jwt from 'jsonwebtoken';

import { IAuthProvider } from './interfaces/IAuthProvider';

export class AuthProvider implements IAuthProvider {
    generateToken(payload: string | object | Buffer, options: jwt.SignOptions | undefined): string {
        return jwt.sign(
            payload, 
            process.env.TOKEN_JWT_KEY, 
            { 
                ...options,
                expiresIn: '15m'                 
            }
        );
    }
    generateRefreshToken(payload: string | object | Buffer, options: jwt.SignOptions | undefined): string {
        return jwt.sign(
            payload, 
            process.env.REFRESH_TOKEN_JWT_KEY, 
            { 
                ...options,
                expiresIn: '7d'
            }
        );
    }
}