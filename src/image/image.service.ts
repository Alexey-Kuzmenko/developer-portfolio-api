import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, remove, writeFile } from 'fs-extra';
import { ImageResponseDto } from './dto/image-response';
import * as sharp from 'sharp';
import { CustomImage } from './custom-image.class';

@Injectable()
export class ImageService {

    async saveImage(images: Array<CustomImage>, folderName: string): Promise<ImageResponseDto[]> {
        const uploadFolder = `${path}/uploads/${folderName}`;
        await ensureDir(uploadFolder);
        const res: Array<ImageResponseDto> = [];

        for (const file of images) {
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
            res.push({
                url: `${folderName}/${file.originalname}`,
                name: file.originalname
            });
        }

        return res;
    }

    async convertToWebp(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer();
    }

    async deleteImage(imgPath: string): Promise<string> {
        try {
            await remove(`${path}/uploads/${imgPath}`);
            return `Image with path: "${imgPath}" successfully deleted`;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteDirectory(dirName: string): Promise<string> {
        try {
            await remove(`${path}/uploads/${dirName}`);
            return `Directory: ${dirName} successfully deleted`;
        } catch (error) {
            throw new Error(error);
        }
    }

}
