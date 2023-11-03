import { ContentLang, Link, PageContent } from './create-page.dto';

export class UpdatePageContentDto implements PageContent {
    _id: string;
    lang: ContentLang;
    title: string;
    body: string;
    image?: string;
    links?: Link[];
}
