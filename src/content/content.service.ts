import { Injectable } from '@nestjs/common';
import { PageContent, ContentLang, ContentType, Content } from './content.model';
import { ContentDto } from './dto/content.dto';

@Injectable()
export class PageService {
    private pages: Array<PageContent> = []

    getPagesContent() {
        return this.pages
    }

    getContent(type: ContentType, lang: ContentLang): Content {
        const pageContent = this.pages.find(page => page.type === type)

        if (lang === 'ua') {
            return pageContent.ua
        }
        if (lang === 'eng') {
            return pageContent.eng
        }
    }

    addPageContent(dto: Omit<PageContent, '_id'>): PageContent {
        const pageContent: PageContent = {
            _id: Math.floor(Math.random() * 10_000).toString(),
            ...dto
        }

        return pageContent
    }

    updateContent(type: ContentType, lang: ContentLang, dto: ContentDto): string {
        const pageContent: PageContent = this.pages.find((page) => page.type === type)
        const content: Content = lang === 'ua' ? pageContent.ua : pageContent.eng

        if (pageContent && content) {
            const pagesCopy: Array<PageContent> = [...this.pages]
            const pageContentIndex: number = this.pages.indexOf(pageContent)

            pagesCopy[pageContentIndex] = { ...pageContent, [lang]: { _id: content._id, ...dto } }
            this.pages = pagesCopy
            return content._id
        }

    }


    deletePageContent(type: ContentType): string {
        this.pages = this.pages.filter((page) => page.type !== type)
        return type
    }

}
