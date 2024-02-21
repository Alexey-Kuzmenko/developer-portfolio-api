import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class MessageDto {
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    message: string
}