import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { ContactService } from './contact.service';
import { ContactModel } from './contact.model';
import { DocumentType } from '@typegoose/typegoose';
import { ApiKeyAuthGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @UseGuards(ApiKeyAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async getContacts(): Promise<DocumentType<ContactModel>[]> {
        return await this.contactService.getAllContacts()
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    @Post()
    async addContact(@Body() dto: ContactDto): Promise<DocumentType<ContactModel>> {
        return this.contactService.createContact(dto)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    @Patch(':id')
    async updateContact(@Param('id') id: string, @Body() dto: ContactDto): Promise<DocumentType<ContactModel>> {
        return this.contactService.updateContact(id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteContactById(@Param('id') id: string): Promise<string> {
        return this.contactService.deleteContact(id)
    }
}
