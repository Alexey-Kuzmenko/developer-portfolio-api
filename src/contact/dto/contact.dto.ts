import { IsNotEmpty, IsString } from 'class-validator'

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
    @IsNotEmpty({ message: 'You must specify icon type' })
    iconType: 'telegram' | 'email' | 'linkedIn' | 'instagram'

    @IsString()
    atl?: string
}