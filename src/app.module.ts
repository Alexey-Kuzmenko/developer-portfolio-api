import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { PageModule } from './page/page.module';
import { SkillModule } from './skill/skill.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProjectModule, PageModule, SkillModule, ContactModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
