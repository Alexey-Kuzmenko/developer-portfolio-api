import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { SkillModel } from './skill.model';

@Module({
  imports: [TypegooseModule.forFeature([
    {
      typegooseClass: SkillModel,
      schemaOptions: {
        collection: 'Skill'
      }
    }
  ])],
  controllers: [SkillController],
  providers: [SkillService]
})
export class SkillModule { }
