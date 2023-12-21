import { Injectable } from '@nestjs/common';
import { PageContent, ContentLang, ContentType, Content } from './content.model';
import { ContentDto } from './dto/content.dto';

@Injectable()
export class ContentService {
    private pagesContent: Array<PageContent> = []

    getPagesContent() {
        return this.pagesContent
    }

    getContent(type: ContentType, lang: ContentLang): Content {
        const pageContent = this.pagesContent.find(page => page.type === type)

        if (lang === 'ua') {
            return pageContent.ua
        }
        if (lang === 'eng') {
            return pageContent.eng
        }
    }

    addPageContent(dto: Omit<PageContent, '_id'>) {
        const pageContent: PageContent = {
            _id: Math.floor(Math.random() * 10_000).toString(),
            ...dto
        }

        return pageContent
    }

    updateContent(type: ContentType, lang: ContentLang, dto: ContentDto): string {
        const pageContent: PageContent = this.pagesContent.find((page) => page.type === type)
        const content: Content = lang === 'ua' ? pageContent.ua : pageContent.eng

        if (pageContent && content) {
            const pagesContentCopy: Array<PageContent> = [...this.pagesContent]
            const pageContentIndex: number = this.pagesContent.indexOf(pageContent)

            pagesContentCopy[pageContentIndex] = { ...pageContent, [lang]: { _id: content._id, ...dto } }
            this.pagesContent = pagesContentCopy
            return content._id
        }

    }


    deletePageContent(type: ContentType): string {
        this.pagesContent = this.pagesContent.filter((page) => page.type !== type)
        return type
    }

}
