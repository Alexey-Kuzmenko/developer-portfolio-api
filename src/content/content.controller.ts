import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Content, ContentType, ContentModel } from './content.model';
import { ContentDto } from './dto/content.dto';
import { ContentService } from './content.service';
import { DocumentType } from '@typegoose/typegoose';

@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    @Get()
    async getPagesContent(): Promise<DocumentType<ContentModel>[]> {
        return this.contentService.getPagesContent()
    }

    @Get(':type/:lang')
    async getContent(@Param() params: any): Promise<Content> {
        return this.contentService.getContent(params.type, params.lang)
    }

    @UsePipes(new ValidationPipe())
    @Post('create')
    async createPageContent(@Body() dto: Pick<ContentModel, 'type' | 'eng' | 'ua'>): Promise<DocumentType<ContentModel>> {
        return this.contentService.addPageContent(dto)
    }

    @UsePipes(new ValidationPipe())
    @Put(':id/:lang')
    async updateContent(@Param() params: any, @Body() dto: ContentDto): Promise<string> {
        return this.contentService.updateContent(params.id, params.lang, dto)
    }

    @Delete(':id')
    deletePageContent(@Param('type') type: ContentType): Promise<string> {
        return this.contentService.deletePageContent(type)
    }
}
