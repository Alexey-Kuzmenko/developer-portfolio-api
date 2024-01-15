import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ContentLang, ContentType, Content, ContentModel } from './content.model';
import { ContentDto } from './dto/content.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CONTENT_ALREADY_EXISTS, CONTENT_BY_TYPE_NOT_FOUND } from './content.constants';

@Injectable()
export class ContentService {
    constructor(@InjectModel(ContentModel) private readonly contentModel: ModelType<ContentModel>) { }

    async getPagesContent(): Promise<DocumentType<ContentModel>[]> {
        return this.contentModel.find().exec()
    }

    async getContent(type: ContentType, lang: ContentLang): Promise<Content> {
        const pageContent: ContentModel = await this.findContent('type', type)

        if (!pageContent) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: CONTENT_BY_TYPE_NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        if (lang === 'ua') {
            return pageContent.ua
        }

        if (lang === 'eng') {
            return pageContent.eng
        }
    }

    async addPageContent(dto: Pick<ContentModel, 'type' | 'eng' | 'ua'>): Promise<DocumentType<ContentModel>> {
        const pageContent: ContentModel = await this.findContent('type', dto.type)

        if (pageContent) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: CONTENT_ALREADY_EXISTS
            }, HttpStatus.CONFLICT)
        } else {
            return this.contentModel.create(dto)
        }

    }

    async updateContent(id: string, lang: ContentLang, dto: ContentDto): Promise<string> {
        const pageContent: ContentModel = await this.findContent('id', id)
        const content: Content = lang === 'ua' ? pageContent.ua : pageContent.eng

        if (pageContent && content) {
            const updatedContent: Content = {
                _id: content._id,
                createdAt: content.createdAt,
                id: content.id,
                ...dto,
            }

            await this.contentModel.findByIdAndUpdate(id, { ...pageContent, [lang]: updatedContent }).exec()
            return `Content with: ${id} successfully updated`
        }

        if (!pageContent) {
            throw new NotFoundException('Page content with proposed id not found')
        }

        if (!content) {
            throw new NotFoundException('Content with proposed language not found')
        }

    }

    async deletePageContent(id: string): Promise<string> {
        await this.contentModel.findByIdAndDelete(id).exec()
        return `Page content with id: ${id} successfully deleted`
    }

    async findContent(findParam: 'type' | 'id', value: ContentType | string) {
        if (findParam === 'type') {
            return this.contentModel.findOne({ type: value }).exec()
        }

        if (findParam === 'id') {
            return this.contentModel.findById(value).exec()
        }
    }

}
