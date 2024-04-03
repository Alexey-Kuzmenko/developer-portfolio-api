import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    userEmail: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    userId: string;
}