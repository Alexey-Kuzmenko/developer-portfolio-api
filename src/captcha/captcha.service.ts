import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CaptchaOptions } from './captcha.interface';
import { CAPTCHA_MODULE_OPTIONS } from './captcha.constants';
import { CaptchaDto } from './dto/captcha.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { CaptchaResponseDto } from './dto/captcha-response.dto';
import { AxiosError } from 'axios';

@Injectable()
export class CaptchaService {
    private options: CaptchaOptions;

    constructor(
        private readonly httpService: HttpService,
        @Inject(CAPTCHA_MODULE_OPTIONS) options: CaptchaOptions
    ) {
        this.options = options;
    }

    async verifyCaptcha(dto: CaptchaDto): Promise<CaptchaResponseDto | void> {

        const { data } = await firstValueFrom(
            this.httpService.post<CaptchaResponseDto>(`${this.options.apiUrl}?secret=${this.options.secretKey}&response=${dto.response}`)
                .pipe(catchError((error: AxiosError) => {
                    Logger.error(error.response.data);
                    throw 'Error!';
                }),
                )
        );

        if (!data.success) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'reCAPTCHA verification failed'
            }, HttpStatus.FORBIDDEN);
        } else {
            return data;
        }
    }
}
