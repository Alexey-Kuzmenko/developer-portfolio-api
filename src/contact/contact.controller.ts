import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { ContactService } from './contact.service';
import { ContactModel } from './contact.model';
import { DocumentType } from '@typegoose/typegoose';
import { ApiKeyAuthGuard } from '../auth/guards/api-key.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('contacts')
@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @UseGuards(ApiKeyAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    @ApiOkResponse({ description: 'Returns all contacts' })
    async getContacts(): Promise<DocumentType<ContactModel>[]> {
        return await this.contactService.getAllContacts();
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    @Post()
    @ApiCreatedResponse({ description: 'New contact successfully created' })
    async addContact(@Body() dto: ContactDto): Promise<DocumentType<ContactModel>> {
        return this.contactService.createContact(dto);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    @Patch(':id')
    @ApiOkResponse({ description: 'Contact successfully updated' })
    async updateContact(@Param('id') id: string, @Body() dto: ContactDto): Promise<DocumentType<ContactModel>> {
        return this.contactService.updateContact(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    @ApiOkResponse({ description: 'Contact successfully deleted' })
    async deleteContactById(@Param('id') id: string): Promise<string> {
        return this.contactService.deleteContact(id);
    }
}
