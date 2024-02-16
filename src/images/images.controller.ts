import { Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors, UploadedFile, Delete, UsePipes, ValidationPipe, Body, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ImagesService } from './images.service';
import { ImageResponseDto } from './dto/image-response';
import { CustomImage } from './custom-image.class';
import { DeleteImageDto } from './dto/delete-image.dto';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) { }

    @Post('upload')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<ImageResponseDto[]> {
        const folderName: string = file.originalname.split('_')[0]
        const images: Array<CustomImage> = [new CustomImage(file)]

        if (file.mimetype.includes('image')) {
            const buffer: Buffer = await this.imagesService.convertToWebp(file.buffer)
            const bufferName = `${file.originalname.split('.')[0]}.webp`
            images.push(
                new CustomImage({ originalname: bufferName, buffer: buffer })
            )
        }

        return this.imagesService.saveImage(images, folderName)
    }

    @Delete('delete')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async deleteImage(@Body() dto: DeleteImageDto): Promise<string> {
        return this.imagesService.deleteImage(dto.imgPath)
    }

    @Delete('delete/:dirName')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async deleteDir(@Param('dirName') dirName: string): Promise<string> {
        return this.imagesService.deleteDirectory(dirName)
    }
}
