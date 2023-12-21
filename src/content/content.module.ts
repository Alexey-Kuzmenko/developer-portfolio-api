import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { PageService } from './content.service';

@Module({
  controllers: [ContentController],
  providers: [PageService]
})
export class ContentModule { }
