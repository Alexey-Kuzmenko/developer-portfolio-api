import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
    @IsEmail()
    email: string
    @IsString()
    @MinLength(5, { message: 'Password is to short' })
    password: string
}
