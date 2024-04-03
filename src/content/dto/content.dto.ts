import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

class Link {
    @ApiProperty({ type: String })
    @IsString()
    label: string;

    @ApiProperty({ type: String })
    @IsString()
    href: string;
}

export class ContentDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty({ message: 'Title value cannot be empty' })
    title: string;

    @ApiPropertyOptional({ type: String })
    @IsString()
    @IsNotEmpty({ message: 'Body value cannot be empty' })
    @IsOptional()
    body?: string;

    @ApiPropertyOptional({ type: String })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiPropertyOptional({ type: () => [Link] })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => Link)
    links?: Array<Link>;
}
