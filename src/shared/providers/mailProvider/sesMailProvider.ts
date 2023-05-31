import fs from 'node:fs';

import handlebars from 'handlebars';
import jwt, { SignOptions } from 'jsonwebtoken';
import { SES } from '@aws-sdk/client-ses';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../interfaces/IMailProvider';


export class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_REGION,
            })
        });
    }

    async sendMail(to: `${string}@${string}.${string}`, subject: string, variables: any, path: string): Promise<void> {
        if (this.client) {
            const templateFileContent = fs.readFileSync(path).toString('utf-8');

            const templateParse = handlebars.compile(templateFileContent);

            const templateHtml = templateParse(variables);

            await this.client.sendMail({
                to,
                from: 'Rentx <victor@vkin.dev>',
                subject,
                html: templateHtml
            });
    
        } else {
            console.error('Fail to create mail client');
        }
    }
    generateEmailToken(payload: string | object | Buffer, options?: SignOptions | undefined): string {
        return jwt.sign(
            payload, 
            process.env.EMAIL_TOKEN_KEY, 
            { 
                ...options,
                expiresIn: '3h'
            }
        );
    }

}
