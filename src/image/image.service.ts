import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, remove, writeFile } from 'fs-extra';
import { ImageResponseDto } from './dto/image-response';
import * as sharp from 'sharp';
import { CustomImage } from './custom-image.class';
import { InjectModel } from 'nestjs-typegoose';
import { ImageModel } from './image.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class ImageService {
    constructor(@InjectModel(ImageModel) private readonly imageModel: ModelType<ImageModel>) { }

    async saveImage(images: Array<CustomImage>, folderName: string): Promise<ImageResponseDto[]> {
        const uploadFolder = `${path}/uploads/${folderName}`;
        await ensureDir(uploadFolder);
        const res: Array<ImageResponseDto> = [];

        for (const file of images) {
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

            const dto: ImageResponseDto = {
                url: `${folderName}/${file.originalname}`,
                name: file.originalname
            };

            await this.addImageData(dto);
            res.push(dto);
        }

        return res;
    }

    async convertToWebp(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer();
    }

    async deleteImage(imgPath: string): Promise<string> {
        try {
            await remove(`${path}/uploads/${imgPath}`);
            await this.deleteImageData(imgPath);
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

    async getImagesData(): Promise<DocumentType<ImageModel>[]> {
        return this.imageModel.find().exec();
    }
    async addImageData(dto: ImageResponseDto): Promise<void> {
        this.imageModel.create(dto);
    }
    async deleteImageData(imgPath: string): Promise<void> {
        this.imageModel.deleteOne({ url: imgPath }).exec();
    }

}
