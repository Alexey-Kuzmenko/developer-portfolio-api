import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Content, ContentModel } from './content.model';
import { ContentDto } from './dto/content.dto';
import { ContentService } from './content.service';
import { DocumentType } from '@typegoose/typegoose';
import { CreateContentDto } from './dto/create-content.dto';

@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    @HttpCode(HttpStatus.OK)
    @Get()
    async getPagesContent(): Promise<DocumentType<ContentModel>[]> {
        return this.contentService.getPagesContent()
    }

    @HttpCode(HttpStatus.OK)
    @Get(':type/:lang')
    async getContent(@Param() params: any): Promise<Content> {
        return this.contentService.getContent(params.type, params.lang)
    }

    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async createPageContent(@Body() dto: CreateContentDto): Promise<DocumentType<ContentModel>> {
        return this.contentService.addPageContent(dto)
    }

    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    @Patch(':id/:lang')
    async updateContent(@Param() params: any, @Body() dto: ContentDto): Promise<DocumentType<ContentModel>> {
        return this.contentService.updateContent(params.id, params.lang, dto)
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    deletePageContent(@Param('id') id: string): Promise<string> {
        return this.contentService.deletePageContent(id)
    }
}
