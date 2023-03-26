import jwt from 'jsonwebtoken';

import { IAuthProvider } from './interfaces/IAuthProvider';

export class AuthProvider implements IAuthProvider {
    generateToken(payload: string | object | Buffer, options: jwt.SignOptions | undefined): string {
        return jwt.sign(payload, process.env.JWT_KEY, options);
    }

}