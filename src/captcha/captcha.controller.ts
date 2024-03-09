import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CaptchaDto } from './dto/captcha.dto';
import { CaptchaResponseDto } from './dto/captcha-response.dto';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
export class CaptchaController {
    constructor(private readonly captchaService: CaptchaService) { }

    @UsePipes(new ValidationPipe())
    @Post('verify')
    async verifyUser(@Body() dto: CaptchaDto): Promise<CaptchaResponseDto | void> {
        return this.captchaService.verifyCaptcha(dto);
    }
}
