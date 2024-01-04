import { Injectable } from '@nestjs/common';
import { ContactModel } from './contact.model';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
    private contacts: Array<ContactModel> = [
        {
            _id: '486b0f17-ccf3-432e-a83d-de4cd7fee91b',
            label: 'Email',
            body: 'alexey.kuzmenko1101@gamil.com',
            href: 'alexey.kuzmenko1101@gamil.com',
            iconType: 'email'
        },
        {
            _id: 'f5ddb82a-9397-48dc-9ca4-34fa0de182e9',
            label: 'Telegram',
            body: '@Alesha_Kuzmenko',
            href: 'https://t.me/Alesha_Kuzmenko',
            iconType: 'telegram'
        },
        {
            _id: '75284160-00cd-4281-afa7-b23604183ca9',
            label: 'LinkedIn',
            body: 'Oleksii Kuzmenko',
            href: 'alexey.kuzmenko1101@gamil.com',
            iconType: 'linkedIn'
        }
    ]

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
