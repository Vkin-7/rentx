import { Request, Response, NextFunction } from 'express';

export interface IEnsureAdmin {
    handle(request: Request, response: Response, next: NextFunction): Promise<void>;
}