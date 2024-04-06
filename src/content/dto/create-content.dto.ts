import { IsEnum, ValidateNested } from 'class-validator';
import { ContentType } from '../content.model';
import { ContentDto } from './content.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
    @ApiProperty({ enum: ContentType })
    @IsEnum(ContentType)
    type: ContentType;

    @ApiProperty({ type: () => ContentDto })
    @ValidateNested()
    @Type(() => ContentDto)
    eng: ContentDto;

    @ApiProperty({ type: () => ContentDto })
    @ValidateNested()
    @Type(() => ContentDto)
    ua: ContentDto;
}