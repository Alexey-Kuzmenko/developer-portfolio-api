import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) { }

    async createUser(dto: CreateUserDto): Promise<DocumentType<UserModel>> {
        const salt = await genSalt(10)

        const user = new this.userModel({
            email: dto.email,
            passwordHash: await hash(dto.password, salt)
        })

        return user.save()
    }

    async findUser(email: string) {
        return this.userModel.findOne({ email: email }).exec()
    }
}
