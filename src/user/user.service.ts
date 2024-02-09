import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash } from 'bcryptjs'
import { DeleteUserDto } from './dto/delete-user.dto';
import { USER_NOT_FOUND } from './user.constants';

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

    async getUsers(): Promise<DocumentType<UserModel>[]> {
        return this.userModel.find().exec()
    }

    async deleteUser(dto: DeleteUserDto): Promise<UserModel> {
        const user = await this.findUser(dto.userEmail)

        if (!user) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: USER_NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        } else {
            await this.userModel.findByIdAndDelete(dto.userId).exec()
            return user
        }
    }
}
