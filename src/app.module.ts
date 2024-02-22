import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { ContentModule } from './content/content.module';
import { SkillModule } from './skill/skill.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { FileModule } from './file/file.module';
import { TelegramModule } from './telegram/telegram.module';
import { getTelegramConfig } from './configs/telegram.config';

@Module({
  imports: [
    ProjectModule,
    ContentModule,
    SkillModule,
    ContactModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    UserModule,
    ImageModule,
    FileModule,
    TelegramModule.forRootAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: getTelegramConfig }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
