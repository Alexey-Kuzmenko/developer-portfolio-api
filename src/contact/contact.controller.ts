import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { ContactService } from './contact.service';
import { ContactModel } from './contact.model';

@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Get()
    getContacts(): Array<ContactModel> {
        return this.contactService.getAllContacts()
    }

    @Post()
    addContact(@Body() dto: ContactDto): ContactModel {
        return this.contactService.createContact(dto)
    }

    @Patch(':id')
    updateContact(@Param('id') id: string, @Body() dto: ContactDto): string {
        return this.contactService.updateContact(id, dto)
    }

    @Delete(':id')
    deleteContactById(@Param('id') id: string) {
        return this.contactService.deleteContact(id)
    }
}
