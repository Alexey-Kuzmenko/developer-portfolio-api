import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async signUp(@Body() dto: AuthDto) { }

    @UsePipes(new ValidationPipe())
    @Post('login')
    async singIn(@Body() dto: AuthDto) { }
}
