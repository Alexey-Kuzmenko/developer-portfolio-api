import { Injectable } from '@nestjs/common';
import { ContactModel } from './contact.model';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
    private contacts: Array<ContactModel> = []

    getAllContacts(): Array<ContactModel> {
        return this.contacts
    }

    createContact(dto: ContactDto): ContactModel {
        const contact: ContactModel = {
            _id: Math.floor(Math.random() * 10_0000).toString(),
            ...dto
        }

        this.contacts.push(contact)
        return contact
    }

    updateContact(id: string, dto: ContactDto): string {
        const contact: ContactModel = this.contacts.find(contact => contact._id === id)

        if (contact) {
            const contactsCopy: Array<ContactModel> = [...this.contacts]
            const contactIndex: number = this.contacts.indexOf(contact)
            contactsCopy[contactIndex] = { _id: contact._id, ...dto }
            this.contacts = contactsCopy
            return id
        }

        if (!contact) {
            throw new Error(`Contact with id: ${id}, is not defined`);
        }
    }


    deleteContact(id: string): string {
        this.contacts.filter(contact => contact._id !== id)
        return id
    }

}
