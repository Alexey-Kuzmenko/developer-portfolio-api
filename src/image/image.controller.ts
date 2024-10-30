import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Delete,
    UsePipes,
    ValidationPipe,
    Body,
    Param,
    Get
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ImageService } from './image.service';
import { ImageResponseDto } from './dto/image-response';
import { CustomImage } from './custom-image.class';
import { DeleteImageDto } from './dto/delete-image.dto';
import { ApiHeader, ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/auth/guards/api-key.guard';
import { ImageModel } from './image.model';
import { DocumentType } from '@typegoose/typegoose';

@ApiTags('images')
@ApiHeader({
    name: 'Content-Type',
    description: 'multipart/form-data'
})
@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    @ApiOkResponse({ description: 'Return data about all images' })
    @HttpCode(HttpStatus.OK)
    @UseGuards(ApiKeyAuthGuard)
    @Get()
    async getImagesData(): Promise<DocumentType<ImageModel>[]> {
        return this.imageService.getImagesData();
    }

    @ApiCreatedResponse({ description: 'Image successfully added' })
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Post('upload')
    async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<ImageResponseDto[]> {
        const folderName: string = file.originalname.split('_')[0];
        const images: Array<CustomImage> = [new CustomImage(file)];

        if (file.mimetype.includes('image')) {
            const buffer: Buffer = await this.imageService.convertToWebp(file.buffer);
            const bufferName = `${file.originalname.split('.')[0]}.webp`;
            images.push(
                new CustomImage({ originalname: bufferName, buffer: buffer })
            );
        }

        return this.imageService.saveImage(images, folderName);
    }

    @ApiOkResponse({ description: 'Image successfully deleted' })
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Delete('delete')
    async deleteImage(@Body() dto: DeleteImageDto): Promise<string> {
        return this.imageService.deleteImage(dto.imgPath);
    }

    @ApiOkResponse({ description: 'Directory successfully deleted' })
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:dirName')
    async deleteDir(@Param('dirName') dirName: string): Promise<string> {
        return this.imageService.deleteDirectory(dirName);
    }
}