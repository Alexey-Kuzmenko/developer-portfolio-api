import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
    @IsString()
    @IsNotEmpty()
    userEmail: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}