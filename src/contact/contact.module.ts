import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ContactModel } from './contact.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ContactModel,
        schemaOptions: {
          collection: 'Contact'
        }
      }
    ])
  ],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule { }
