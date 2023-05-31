/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT: string;
        TOKEN_JWT_KEY: string;
        REFRESH_TOKEN_JWT_KEY: string;
        EMAIL_TOKEN_KEY: string;
        BASE_URL: string;
        FORGOT_MAIL_URL: string;
        MAIL_PROVIDER: 'ethereal' | 'ses';

        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_BUCKET: string;
        AWS_BUCKET_REGION: string;
        AWS_BUCKET_URL: string;

        AWS_REGION: string;

        DISK: 'local' | 's3';
    }
}