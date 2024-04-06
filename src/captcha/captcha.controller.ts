import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CaptchaDto } from './dto/captcha.dto';
import { CaptchaResponseDto } from './dto/captcha-response.dto';
import { CaptchaService } from './captcha.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/auth/guards/api-key.guard';

@ApiTags('captcha')
@Controller('captcha')
export class CaptchaController {
    constructor(private readonly captchaService: CaptchaService) { }

    @UseGuards(ApiKeyAuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Post('verify')
    @ApiOkResponse({ description: 'reCAPTCHA successfully verified' })
    async verifyUser(@Body() dto: CaptchaDto): Promise<CaptchaResponseDto | void> {
        return this.captchaService.verifyCaptcha(dto);
    }
}
