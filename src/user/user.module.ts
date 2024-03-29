import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: UserModel,
      schemaOptions: {
        collection: 'User'
      }
    }])
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule { }
