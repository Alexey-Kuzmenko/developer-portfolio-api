import { Body, Controller, Get, Post, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiKeyAuthGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileService } from './file.service';
import { createReadStream } from 'fs';
import { path } from 'app-root-path';
import type { Response } from 'express';
import { GetFileDto } from './dto/get-file.dto';
import { join } from 'path';

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.saveFile(file);
    }

    @Get()
    @UseGuards(ApiKeyAuthGuard)
    @UsePipes(new ValidationPipe())
    getFile(@Body() { fileName }: GetFileDto, @Res({ passthrough: true }) res: Response): StreamableFile {
        const file = createReadStream(join(`${path}/uploads/files`, fileName));
        res.set({
            'Content-Type': 'multipart/form-data',
            'Content-Disposition': `attachment; filename="${fileName}"`
        });

        return new StreamableFile(file);
    }
}
