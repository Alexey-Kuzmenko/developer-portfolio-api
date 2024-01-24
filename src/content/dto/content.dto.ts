import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

class Link {
    @IsString()
    label: string
    @IsString()
    href: string
}

export class ContentDto {
    @IsString()
    @IsNotEmpty({ message: 'Title value cannot be empty' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Body value cannot be empty' })
    @IsOptional()
    body?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => Link)
    @Type(() => Link)
    links?: Array<Link>;
}
