import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ type: String })
    @IsEmail()
    @IsNotEmpty({ message: 'User email cannot be empty' })
    email: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty({ message: 'User password cannot be empty' })
    password: string;
}