import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CaptchaResponseDto {
    @IsBoolean()
    success: boolean;

    @IsOptional()
    @IsDateString()
    challenge_ts?: Date;

    @IsString()
    hostname: string;

    @IsOptional()
    @IsString({ each: true })
    errorCodes?: Array<string>;
}