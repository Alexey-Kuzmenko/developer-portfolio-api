import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export type ContentLang = 'ua' | 'eng';

export enum ContentType {
    ABOUT = 'about',
    CONTACTS = 'contacts',
    SERVICES = 'services',
    PROJECTS = 'projects'
}


export class Link {
    @prop({ type: () => String })
    label: string
    @prop({ type: () => String })
    href: string
}

export interface Content extends Base { }
export class Content extends TimeStamps {
    @prop({ required: true })
    title: string
    @prop()
    body?: string
    @prop()
    image?: string
    @prop({ type: () => [Link] })
    links?: Array<Link>
}

export interface PageContent extends Base { }
export class PageContent extends TimeStamps {
    @prop({ enum: ContentType })
    type: ContentType
    @prop()
    ua: Content
    @prop()
    eng: Content
}
