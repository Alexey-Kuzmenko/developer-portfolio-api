import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IconType } from '../contact.model'

export class ContactDto {
    @IsString()
    @IsNotEmpty({ message: 'Label value cannot be empty' })
    label: string

    @IsString()
    @IsNotEmpty({ message: 'Body value cannot be empty' })
    body: string

    @IsString()
    @IsNotEmpty({ message: 'Href value cannot be empty' })
    href: string

    @IsEnum(IconType)
    iconType: IconType

    @IsString()
    @IsOptional()
    atl?: string
}