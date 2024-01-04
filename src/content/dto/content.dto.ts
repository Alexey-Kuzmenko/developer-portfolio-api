import { Link } from '../content.model';

export class ContentDto {
    title: string;
    body: string;
    image?: string;
    links?: Link[];
}
