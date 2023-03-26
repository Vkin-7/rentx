import multer from 'multer';
import crypto from 'node:crypto';
import path from 'node:path';


export class UploadService {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: path.resolve('.', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                }
            })
        };
    }
}