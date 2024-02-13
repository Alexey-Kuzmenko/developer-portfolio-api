import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { ImageResponseDto } from './dto/image-response';

@Injectable()
export class ImagesService {

    async saveImage(file: Express.Multer.File): Promise<ImageResponseDto> {
        const folderName: string = file.originalname.split('_')[0]
        const uploadFolder = `${path}/uploads/${folderName}`

        await ensureDir(uploadFolder)

        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
        return {
            url: `${folderName}/${file.originalname}`,
            name: file.originalname
        }
    }
}
