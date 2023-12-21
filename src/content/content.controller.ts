import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Content, ContentType, PageContent } from './content.model';
import { ContentDto } from './dto/content.dto';
import { PageService } from './content.service';

@Controller('content')
export class ContentController {
    constructor(private readonly pageService: PageService) { }

    @Get()
    getPagesContent(): Array<PageContent> {
        return this.pageService.getPagesContent()
    }

    @Get(':type/:lang')
    getContent(@Param() params: any): Content {
        return this.pageService.getContent(params.type, params.lang)
    }

    @Post('create')
    createPageContent(@Body() dto: Omit<PageContent, '_id'>): PageContent {
        return this.pageService.addPageContent(dto)
    }

    @Put(':type/:lang')
    updateContent(@Param() params: any, @Body() dto: ContentDto) {
        return this.pageService.updateContent(params.type, params.lang, dto)
    }

    @Delete(':type')
    deletePageContent(@Param('type') type: ContentType) {
        return this.pageService.deletePageContent(type)
    }
}
