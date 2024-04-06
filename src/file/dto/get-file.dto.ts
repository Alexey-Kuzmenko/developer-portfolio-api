import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetFileDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    fileName: string;
}