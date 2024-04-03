import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SkillDto {
    @ApiProperty({ type: String, description: 'Unique name of technology (skill)' })
    @IsNotEmpty({ message: 'Slug value cannot be empty' })
    @IsString()
    slug: string;

    @ApiProperty({ type: String, description: 'Name of technology (skill)' })
    @IsNotEmpty({ message: 'Label value cannot be empty' })
    @IsString()
    label: string;

    @ApiProperty({ type: String, description: 'Class for DEVICON set of icons' })
    @IsNotEmpty({ message: 'You must specify icon class' })
    @IsString()
    iconClass: string;
}