import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IconType } from '../contact.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactDto {
    @ApiProperty({ type: String, description: 'Name of social media or name of contact type' })
    @IsString()
    @IsNotEmpty({ message: 'Label value cannot be empty' })
    label: string;

    @ApiProperty({ type: String, description: 'Email, user name, or account name' })
    @IsString()
    @IsNotEmpty({ message: 'Body value cannot be empty' })
    body: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty({ message: 'Href value cannot be empty' })
    href: string;

    @ApiProperty({ enum: IconType })
    @IsEnum(IconType)
    iconType: IconType;

    @ApiPropertyOptional({ type: String })
    @IsString()
    @IsOptional()
    atl?: string;
}