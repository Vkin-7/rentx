import { AppError } from '@Shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export class ErrorMiddleware {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(error: Error, request: Request, response: Response, next: NextFunction) {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                message: error.message
            });
        }

        return response.status(500).json({
            status: 'error',
            message: `Internal server error - ${error.message}`
        });
    }
}