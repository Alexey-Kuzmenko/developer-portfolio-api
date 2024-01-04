export type ContentLang = 'ua' | 'eng';

export type ContentType = 'about' | 'contacts' | 'services' | 'projects'

export interface Link {
    label: string
    href: string
}

export interface Content {
    _id: string
    title?: string
    body?: string
    image?: string
    links?: Array<Link>
}

export class PageContent {
    _id: string
    type: ContentType
    ua: Content
    eng: Content
}
