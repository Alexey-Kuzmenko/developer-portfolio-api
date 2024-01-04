import { Injectable } from '@nestjs/common';
import { PageContent, ContentLang, ContentType, Content } from './content.model';
import { ContentDto } from './dto/content.dto';

@Injectable()
export class ContentService {
    private pagesContent: Array<PageContent> = [
        {
            _id: '04c35694-7a9e-43ac-8324-82c891a6ad51',
            type: 'about',
            ua: {
                _id: '3164010e-90b6-480a-b655-5167f5267917',
                title: 'Про мене',
                body: ''
            },
            eng: {
                _id: '1744e841-2026-4a72-8a24-d186ce977c13',
                title: 'About me',
                body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam enim. In faucibus sollicitudin justo quis sollicitudin. Nullam eget turpis non elit consectetur sagittis. Aliquam vel libero blandit, lobortis velit sed, pharetra odio. Duis ut dui metus. Nullam sollicitudin ornare tellus, sed ultrices orci vehicula nec. Pellentesque rutrum a sapien nec rutrum. Maecenas diam orci, placerat a aliquet non, laoreet vitae nisl. Cras tincidunt turpis non tempor ornare. Mauris fermentum, dolor in ultrices convallis, libero augue volutpat risus, sed laoreet lorem neque id nisi.`
            }
        },
        {
            _id: '9341d7b1-d01a-4541-b197-0f96254383ab',
            type: 'projects',
            eng: {
                _id: 'ec4e9948-2529-4083-a809-018438b4eb9b',
                title: 'Take a look at the latest projects I\'ve done'
            },
            ua: {
                _id: 'f8cd523c-99c7-489b-8698-257ffdee2fd7',
                title: 'Погляньте на мої останні проекти'
            }
        },
        {
            _id: '6d4fb631-2ad1-4d94-80b0-0312a5d0768e',
            type: 'services',
            eng: {
                _id: 'a403214f-1536-48f0-a13b-8e137a732a2c',
                title: 'Front-End development solutions',
                body: `
                You are looking for a beautiful, functional, and user-friendly website or web application? Get in touch with me today to learn more about my solutions and affordable prices.
                `
            },
            ua: {
                _id: '4c890f8a-aac5-495a-b75f-6208432228dd',
                title: 'Front-End рішення',
                body: `Ви шукаєте красивий, функціональний і зручний веб-сайт або веб-додаток? Зв'яжіться зі мною сьогодні, щоб дізнатися більше про мої рішення та доступні ціни.
                `
            }
        },
        {
            _id: '9230e347-f3ed-4771-8ad3-e50bb5eca37d',
            type: 'contacts',
            eng: {
                _id: '4d3a8a0b-1962-4d42-bd15-e65e73706562',
                title: 'Get in touch',
                body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non diam enim. In faucibus sollicitudin justo quis sollicitudin. Nullam eget turpis non elit consectetur sagittis. Aliquam vel libero blandit, lobortis velit sed, pharetra odio. Duis ut dui metus.
                `
            },
            ua: {
                _id: '3c796ba9-36c1-4cd7-b430-cabdaf638fb9',
                title: 'зв\'яжіться зі мною',
                body: ''
            },
        }
    ]

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
