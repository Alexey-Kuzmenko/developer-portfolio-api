import { Contains, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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

    @IsString()
    @Contains('telegram')
    @Contains('email')
    @Contains('linkedIn')
    @Contains('instagram')
    @IsNotEmpty({ message: 'You must specify icon type' })
    iconType: 'telegram' | 'email' | 'linkedIn' | 'instagram'

    @IsString()
    @IsOptional()
    atl?: string
}