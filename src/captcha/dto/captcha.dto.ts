import { IsNotEmpty, IsString } from 'class-validator';

export class CaptchaDto {
    @IsNotEmpty()
    @IsString()
    response: string;
}