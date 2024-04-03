import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @ApiProperty({ type: String })
    @IsEmail()
    email: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    password: string;
}
