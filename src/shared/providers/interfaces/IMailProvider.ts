export type MailTemplateString = `${string}@${string}.${string}`;

export interface IMailProvider {
    sendMail(to: MailTemplateString, subject: string, body: string): Promise<void>;
}