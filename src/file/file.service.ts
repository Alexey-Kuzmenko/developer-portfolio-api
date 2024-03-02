import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FileService {
    async saveFile(file: Express.Multer.File): Promise<string> {
        try {
            const uploadFolder = `${path}/uploads/files`;
            await ensureDir(uploadFolder);
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

            return `File: ${file.originalname} successfully saved`;
        } catch (error) {
            throw new Error(error);
        }
    }
}
