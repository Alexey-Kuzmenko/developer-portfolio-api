import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { TypegooseModule } from 'nestjs-typegoose';
import { ImageModel } from './image.model';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: `${path}/uploads`,
    serveRoot: '/static'
  }),
  TypegooseModule.forFeature([{
    typegooseClass: ImageModel,
    schemaOptions: {
      collection: 'Image'
    }
  }])
  ],
  controllers: [ImageController,],
  providers: [ImageService]
})
export class ImageModule { }
