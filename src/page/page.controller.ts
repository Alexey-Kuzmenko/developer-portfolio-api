import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
// ! testing PageContent
import { CreatePageDto, PageContent } from './dto/create-page-dto';
import { UpdatePageContentDto } from './dto/update-page-content-dto';

@Controller('page')
export class PageController {

    @Get(':type')
    async getPageByType(@Param('type') type: string): Promise<string> {
        return `Param ${type}`
    }

    @Get(':type/:lang')
    async getPageByLang(@Param() params: any): Promise<string> {
        return `Page type: ${params.type}, page language: ${params.lang}`
    }

    @Post('create')
    async createPage(@Body() dto: CreatePageDto): Promise<PageContent> {
        return dto.content.eng
    }

    @Put(':type/:lang')
    async updatePageContent(@Param() params: any, @Body() dto: UpdatePageContentDto): Promise<string> {
        return `Page type: ${params.type}, page language: ${params.lang}, content title: ${dto.title}`
    }

    @Delete(':type/:lang')
    async deletePage(@Param() params: any): Promise<string> {
        return `Page type: ${params.type}, page language: ${params.lang}`
    }
}
