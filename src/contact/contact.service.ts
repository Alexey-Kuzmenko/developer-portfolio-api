import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContactModel } from './contact.model';
import { ContactDto } from './dto/contact.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CONTACT_NOT_FOUND, CONTACT_ALREADY_EXISTS } from './contact.constants';

@Injectable()
export class ContactService {

    constructor(@InjectModel(ContactModel) private readonly contactModel: ModelType<ContactModel>) { }

    async getAllContacts(): Promise<DocumentType<ContactModel>[]> {
        return this.contactModel.find().exec()
    }

    async createContact(dto: ContactDto): Promise<DocumentType<ContactModel>> {
        const contact = await this.findContact(dto.label, 'label')

        if (contact) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: CONTACT_ALREADY_EXISTS,
            }, HttpStatus.CONFLICT);
        } else {
            return this.contactModel.create(dto)
        }
    }

    async updateContact(id: string, dto: ContactDto): Promise<DocumentType<ContactModel>> {
        const contact = await this.findContact(id, 'id')

        if (!contact) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: CONTACT_NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        }

        if (contact) {
            return this.contactModel.findByIdAndUpdate(id, dto, { new: true })
        }

    }

    async deleteContact(id: string): Promise<string> {
        await this.contactModel.findByIdAndDelete(id)
        return `Contact with: ${id} successfully deleted`
    }

    async findContact(value: string, findParam: 'label' | 'id') {
        if (findParam === 'label') {
            return this.contactModel.findOne({ label: value }).exec()
        }

        if (findParam === 'id') {
            return this.contactModel.findById(value).exec()
        }
    }

}
