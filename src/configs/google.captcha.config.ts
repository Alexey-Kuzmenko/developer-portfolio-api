import { ConfigService } from '@nestjs/config';
import { CaptchaOptions } from 'src/captcha/captcha.interface';

export const getGoogleCaptchaConfig = (configService: ConfigService): CaptchaOptions => {
    return {
        secretKey: configService.get('RECAPTCHA_SECRET_KEY'),
        apiUrl: configService.get('GOOGLE_RECAPTCHA_API_URL')
    };
};