import { IsArray, IsNotEmpty, IsString, IsUrl, } from 'class-validator'

export class ProjectDto {
    @IsNotEmpty({ message: 'Project name cannot be empty value' })
    @IsString()
    name: string

    @IsArray()
    tags: Array<string>

    @IsNotEmpty({ message: 'Project description cannot be empty value' })
    @IsString()
    description: string

    @IsUrl({}, { message: 'This value must be an URL' })
    link: string

    @IsUrl({}, { message: 'This value must be an URL' })
    repoLink: string

    @IsString()
    previewImage: string

    @IsArray()
    images?: Array<string>

    @IsString()
    body?: string

    @IsNotEmpty({ message: 'Project stack of technologies cannot be empty value' })
    @IsArray()
    technologies: Array<{ iconClass: string, label: string }>
}