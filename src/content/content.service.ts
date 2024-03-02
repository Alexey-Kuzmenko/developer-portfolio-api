import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ContentLang, ContentType, Content, ContentModel } from './content.model';
import { ContentDto } from './dto/content.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CONTENT_ALREADY_EXISTS, CONTENT_BY_ID_NOT_FOUND, CONTENT_BY_LANG_NOT_FOUND, CONTENT_BY_TYPE_NOT_FOUND } from './content.constants';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentService {
    constructor(@InjectModel(ContentModel) private readonly contentModel: ModelType<ContentModel>) { }

    async getPagesContent(): Promise<DocumentType<ContentModel>[]> {
        return this.contentModel.find().exec();
    }

    async getContent(type: ContentType, lang: ContentLang): Promise<Content> {
        const pageContent: ContentModel = await this.findContent('type', type);

        if (!pageContent) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: CONTENT_BY_TYPE_NOT_FOUND
            }, HttpStatus.NOT_FOUND);
        }

        if (lang === 'ua') {
            return pageContent.ua;
        }

        if (lang === 'eng') {
            return pageContent.eng;
        }
    }

    async addPageContent(dto: CreateContentDto): Promise<DocumentType<ContentModel>> {
        const pageContent: ContentModel = await this.findContent('type', dto.type);

        if (pageContent) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: CONTENT_ALREADY_EXISTS
            }, HttpStatus.CONFLICT);
        } else {
            return this.contentModel.create(dto);
        }

    }

    async updateContent(id: string, lang: ContentLang, dto: ContentDto): Promise<DocumentType<ContentModel>> {
        const pageContent: ContentModel = await this.findContent('id', id);
        let content: Content;

        if (!pageContent) {
            throw new NotFoundException(CONTENT_BY_ID_NOT_FOUND);
        }

        if (pageContent) {
            content = lang === 'ua' ? pageContent.ua : lang === 'eng' ? pageContent.eng : null;
        }

        if (!content) {
            throw new NotFoundException(CONTENT_BY_LANG_NOT_FOUND);
        }

        if (pageContent && content) {
            const updatedContent: Content = {
                _id: content._id,
                createdAt: content.createdAt,
                id: content.id,
                ...dto
            };

            const updatedPageContent = {
                ...pageContent,
                ...pageContent[lang] = updatedContent
            };

            return this.contentModel.findByIdAndUpdate(id, updatedPageContent, { new: true }).exec();
        }

    }

    async deletePageContent(id: string): Promise<string> {
        await this.contentModel.findByIdAndDelete(id).exec();
        return `Page content with id: ${id} successfully deleted`;
    }

    async findContent(findParam: 'type' | 'id', value: ContentType | string) {
        if (findParam === 'type') {
            return this.contentModel.findOne({ type: value }).exec();
        }

        if (findParam === 'id') {
            return this.contentModel.findById(value).exec();
        }
    }

}
