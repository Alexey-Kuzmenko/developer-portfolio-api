import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';

@Controller('contacts')
export class ContactController {
    @Get()
    async getContacts() { }

    @Post()
    async addContact(@Body() dto: ContactDto) { }

    @Patch(':id')
    async updateContact(@Param('id') id: string, @Body() dto: ContactDto) { }

    @Delete(':id')
    async deleteContactById(@Param('id') id: string) { }
}
