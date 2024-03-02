import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty({ message: 'User email cannot be empty' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'User password cannot be empty' })
    password: string;
}