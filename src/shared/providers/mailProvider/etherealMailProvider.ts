import { injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'node:fs';
import jwt from 'jsonwebtoken';


import { IMailProvider, MailTemplateString } from '../interfaces/IMailProvider';

@injectable()
export class EtherealMailProvider implements IMailProvider {
    private client: Transporter | undefined = undefined;

    constructor() {
        nodemailer
            .createTestAccount()
            .then(account => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                });

                this.client = transporter;
            })
            .catch(err => console.error(err));
    }

    async sendMail(to: MailTemplateString, subject: string, variables: any, path: string): Promise<void> {
        if (this.client) {
            const templateFileContent = fs.readFileSync(path).toString('utf-8');

            const templateParse = handlebars.compile(templateFileContent);

            const templateHtml = templateParse(variables);

            const message = await this.client.sendMail({
                to,
                from: 'Rentx <noreplay@rentx.com>',
                subject,
                html: templateHtml
            });
    
            console.log('Message sent: %s', message.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
        } else {
            console.error('Fail to create mail client');
        }
    }

    generateEmailToken(payload: string | object | Buffer, options?: jwt.SignOptions): string {
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