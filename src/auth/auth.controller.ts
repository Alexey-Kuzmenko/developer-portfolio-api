import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    @Post('register')
    async signUp(@Body() dto: AuthDto) { }

    @Post('login')
    async singIn(@Body() dto: AuthDto) { }
}
