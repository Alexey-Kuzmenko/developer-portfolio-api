import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { USER_ALREADY_EXIST } from '../user/user.constants';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly telegramService: TelegramService
    ) { }

    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async signUp(@Body() dto: AuthDto) {
        const user = await this.userService.findUser(dto.email);

        if (user) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: USER_ALREADY_EXIST
            }, HttpStatus.CONFLICT);
        } else {
            const message: string = this.telegramService.generateMessage(dto, 'register');
            await this.telegramService.sendAuthMessage(message);
            return this.userService.createUser(dto);
        }

    }

    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async singIn(@Body() dto: AuthDto) {
        const user = await this.userService.findUser(dto.email);
        const { email } = await this.authService.validateUser(user, dto);

        const message: string = this.telegramService.generateMessage(dto, 'login');
        await this.telegramService.sendAuthMessage(message);

        return this.authService.login(email);
    }
}
