import { Body, Controller, Delete, Get, HttpCode, HttpStatus, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { DocumentType } from '@typegoose/typegoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    @ApiOkResponse({ description: 'Returns all users' })
    async getAllUsers(): Promise<DocumentType<UserModel>[]> {
        return this.userService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    @Delete()
    @ApiOkResponse({ description: 'User successfully deleted' })
    async deleteUser(@Body() dto: DeleteUserDto): Promise<UserModel> {
        return this.userService.deleteUser(dto);
    }
}
