import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';

class ProjectTechnology {
    @ApiProperty({ type: String })
    @IsString()
    iconClass: string;

    @ApiProperty({ type: String })
    @IsString()
    label: string;
}

export class ProjectDto {
    @ApiProperty({ type: String })
    @IsNotEmpty({ message: 'Project name cannot be empty value' })
    @IsString()
    name: string;

    @ApiProperty({ type: [String], description: 'Tags are a display stack of technologies used in project development' })
    @IsArray()
    @IsString({ each: true })
    tags: Array<string>;

    @ApiProperty({ type: String, description: 'Project description' })
    @IsNotEmpty({ message: 'Project description cannot be empty value' })
    @IsString()
    description: string;

    @ApiProperty({ type: String })
    @IsUrl()
    link: string;

    @ApiProperty({ type: String })
    @IsUrl()
    repoLink: string;

    @ApiProperty({ type: String })
    @IsString()
    image: string;

    @ApiProperty({ type: String, description: 'Brief description of a project. Used for project cards and SEO description' })
    @IsString()
    body: string;

    @ApiProperty({ type: () => [ProjectTechnology] })
    @IsArray()
    @ValidateNested()
    @Type(() => ProjectTechnology)
    technologies: Array<ProjectTechnology>;
}