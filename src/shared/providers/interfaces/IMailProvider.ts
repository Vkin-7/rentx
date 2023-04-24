import { SignOptions } from 'jsonwebtoken';
export type MailTemplateString = `${string}@${string}.${string}`;

export interface IMailProvider {
    sendMail(to: MailTemplateString, subject: string, variables: any, path: string): Promise<void>;
    generateEmailToken(payload: string | object | Buffer, options?: SignOptions): string
}