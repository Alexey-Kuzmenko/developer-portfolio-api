import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: `${path}/uploads`,
    serveRoot: '/static'
  })],
  controllers: [ImageController,],
  providers: [ImageService]
})
export class ImageModule { }
