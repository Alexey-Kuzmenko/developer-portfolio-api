import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProjectModel } from './project.model';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: ProjectModel,
      schemaOptions: {
        collection: 'Project'
      }
    }])
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule { }
