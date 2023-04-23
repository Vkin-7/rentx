import { injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider, MailTemplateString } from './interfaces/IMailProvider';

@injectable()
export class MailProvider implements IMailProvider {
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

    async sendMail(to: MailTemplateString, subject: string, body: string): Promise<void> {
        if (this.client) {
            const message = await this.client.sendMail({
                to,
                from: 'Rentx <noreplay@rentx.com>',
                subject,
                text: body,
                html: body
            });
    
            console.log('Message sent: %s', message.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
        } else {
            console.error('Fail to create mail client');
        }
    }
}