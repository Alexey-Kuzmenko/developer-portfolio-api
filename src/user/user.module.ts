import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from './user.model';

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
  exports: [UserService]
})
export class UserModule { }
