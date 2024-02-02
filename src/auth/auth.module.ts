import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './strategies/api-key.strategy';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, ApiKeyStrategy]
})
export class AuthModule { }
