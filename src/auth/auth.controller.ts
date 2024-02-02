import { Body, Controller, Get, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { USER_ALREADY_EXIST } from 'src/user/user.constants';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async signUp(@Body() dto: AuthDto) {
        const user = await this.userService.findUser(dto.email)

        if (user) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: USER_ALREADY_EXIST
            }, HttpStatus.CONFLICT)
        } else {
            return this.userService.createUser(dto)
        }

    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    async singIn(@Body() dto: AuthDto) { }
}
