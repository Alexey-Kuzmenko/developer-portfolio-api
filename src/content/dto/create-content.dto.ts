import { IsEnum, ValidateNested } from 'class-validator';
import { Content, ContentType } from '../content.model';
import { ContentDto } from './content.dto';
import { Type } from 'class-transformer';
export class CreateContentDto {
    @IsEnum(ContentType)
    type: ContentType;

    @ValidateNested()
    @Type(() => Content)
    eng: ContentDto;

    @ValidateNested()
    @Type(() => Content)
    ua: ContentDto;
}