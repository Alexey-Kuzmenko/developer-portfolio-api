import { IsNotEmpty, IsString } from 'class-validator'

export class SkillDto {
    @IsNotEmpty({ message: 'Slug value cannot be empty' })
    @IsString()
    slug: string

    @IsNotEmpty({ message: 'Label value cannot be empty' })
    @IsString()
    label: string

    @IsNotEmpty({ message: 'You must specify icon class' })
    @IsString()
    iconClass: string
}