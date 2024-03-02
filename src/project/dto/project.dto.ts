import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';

class ProjectTechnology {
    @IsString()
    iconClass: string;
    @IsString()
    label: string;
}

export class ProjectDto {
    @IsNotEmpty({ message: 'Project name cannot be empty value' })
    @IsString()
    name: string;

    @IsArray()
    @IsString({ each: true })
    tags: Array<string>;

    @IsNotEmpty({ message: 'Project description cannot be empty value' })
    @IsString()
    description: string;

    @IsUrl()
    link: string;

    @IsUrl()
    repoLink: string;

    @IsString()
    image: string;

    @IsString()
    body: string;

    @IsArray()
    @ValidateNested()
    @Type(() => ProjectTechnology)
    technologies: Array<ProjectTechnology>;
}