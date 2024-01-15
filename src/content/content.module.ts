import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ContentModel } from './content.model';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: ContentModel,
      schemaOptions: {
        collection: 'Content'
      }
    }])
  ],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule { }
