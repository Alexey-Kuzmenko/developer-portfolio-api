import { Body, Controller, Delete, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { DocumentType } from '@typegoose/typegoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers(): Promise<DocumentType<UserModel>[]> {
        return this.userService.getUsers()
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete()
    async deleteUser(@Body() dto: DeleteUserDto): Promise<UserModel> {
        return this.userService.deleteUser(dto)
    }
}
