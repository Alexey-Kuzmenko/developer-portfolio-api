import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Link } from '../content.model';

export class ContentDto {
    @IsString()
    @IsNotEmpty({ message: 'Title value cannot be empty' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Body value cannot be empty' })
    body: string;

    @IsString()
    image?: string;

    @IsArray()
    links?: Array<Link>;
}
