import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteImageDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    imgPath: string;
}