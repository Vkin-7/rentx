import { Request, Response, NextFunction } from 'express';

export interface IEnsureAuthenticated {
    handle(request: Request, response: Response, next: NextFunction): Promise<void>;
}