/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT: string;
        JWT_KEY: string;
    }
}