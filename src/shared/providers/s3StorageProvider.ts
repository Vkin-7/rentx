import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { resolve } from 'node:path';
import fs from 'node:fs';
import mime from 'mime';

import { IStorageProvider } from './interfaces/IStorageProvider';
import upload from '@Services/upload';

export class S3StorageProvider implements IStorageProvider {
    private client: S3Client;

    constructor() {
        this.client = new S3Client({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);
        
        const contentType = mime.getType(originalName) as string;

        try {
            const command = new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET,
                Key: `${folder}/${file}`,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: contentType,
            });
    
            await this.client.send(command);
    
            await fs.promises.unlink(originalName);   
        } catch (error) {
            console.error(error);
        }

        return file;
    }
    
    async delete(file: string, folder: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: `${process.env.AWS_BUCKET}`,
            Key: `${folder}/${file}`,
        });

        try {
            await this.client.send(command);
        } catch(error) {
            console.error(error);
        }
        
    }

}