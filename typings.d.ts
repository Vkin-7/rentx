/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT: string;
        TOKEN_JWT_KEY: string;
        REFRESH_TOKEN_JWT_KEY: string;
    }
}