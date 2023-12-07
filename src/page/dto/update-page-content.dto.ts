import { ContentLang, Link, PageContent } from '../page.model';

export class UpdatePageContentDto implements PageContent {
    _id: string;
    lang: ContentLang;
    title: string;
    body: string;
    image?: string;
    links?: Link[];
}
