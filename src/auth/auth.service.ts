import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcryptjs';
import { INCORRECT_USER_PASSWORD, USER_NOT_FOUND } from 'src/user/user.constants';
import { UserModel } from 'src/user/user.model';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    validateApiKey(apiKey: string): string | null {
        const permanentApiKey = this.configService.get('API_KEY')
        return apiKey === permanentApiKey ? apiKey : null
    }

    async validateUser(user: UserModel, dto: AuthDto): Promise<Pick<UserModel, 'email'>> {

        if (!user) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: USER_NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        const isPasswordCorrect = await compare(dto.password, user.passwordHash)

        if (!isPasswordCorrect) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: INCORRECT_USER_PASSWORD
            }, HttpStatus.UNAUTHORIZED)
        }

        return { email: user.email }
    }

    async login(email: string) {
        const payload = { email }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

}
