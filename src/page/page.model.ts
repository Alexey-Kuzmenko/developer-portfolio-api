export enum ContentLang {
    UA = 'ua',
    ENG = 'eng'
}

export enum PagesType {
    HOME = 'home',
    PORTFOLIO = 'portfolio',
    CONTACTS = 'contacts'
}

export interface Link {
    label: string
    href: string
}

export interface PageContent {
    _id: string
    lang: ContentLang
    title?: string
    body?: string
    image?: string
    links?: Array<Link>
}

export class PageModel {
    _id: string
    type: PagesType
    content: {
        ua: PageContent,
        eng: PageContent
    }
    extraContent?: Array<PageContent>
}
