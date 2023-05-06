import { IMailProvider } from '@Shared/providers/interfaces/IMailProvider';
import { SignOptions } from 'jsonwebtoken';

export class MailProviderInMemory implements IMailProvider {
    private message: any[] = [];

    async sendMail(to: `${string}@${string}.${string}`, subject: string, variables: any, path: string): Promise<void> {
        this.message.push({
            to,
            subject,
            variables,
            path
        });
    }
    
    generateEmailToken(payload: string | object | Buffer, options?: SignOptions | undefined): string {
        return 'test';
    }
    
}