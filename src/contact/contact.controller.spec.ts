import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactModel } from './contact.model';


describe('AppController', () => {
    let contactController: ContactController;
    let contactService: ContactService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ContactController],
            providers: [ContactService],
        }).compile();

        contactController = app.get<ContactController>(ContactController);
        contactService = app.get<ContactService>(ContactService);
    });

    it('controller should be defined', () => {
        expect(contactController).toBeDefined();
    });

    describe('ContactService', () => {
        it('service should be defined', () => {
            expect(contactService).toBeDefined();
        });
    });

    describe('getContacts', () => {
        it('service should return an array of contacts', () => {
            const result: Array<ContactModel> = [];
            jest.spyOn(contactService, 'getAllContacts').mockImplementation(() => result);
            expect(contactController.getContacts()).toBe(result);
        });
    });

    describe('addContact', () => {
        it('service should return an created contact', () => {
            const result: ContactModel = {
                _id: '65b2e9ec-9c84-4d85-9073-86b1d875ade8',
                label: 'instagram',
                body: 'test',
                href: 'link',
                atl: 'Instagram page',
                iconType: 'email'
            };

            jest.spyOn(contactService, 'createContact').mockImplementation(() => result);
            expect(contactController.addContact(result)).toBe<ContactModel>(result);
        });
    });

    describe('updateContact', () => {
        it('service should return an id of contact', () => {
            const dto: ContactModel = {
                _id: '65b2e9ec-9c84-4d85-9073-86b1d875ade8',
                label: 'instagram',
                body: 'test',
                href: 'link',
                atl: 'Instagram page',
                iconType: 'email'
            };
            const result: string = dto._id;

            jest.spyOn(contactService, 'updateContact').mockImplementation(() => result);
            expect(contactController.updateContact(result, dto)).toBe<string>(result);
        });
    });

    describe('deleteContact', () => {
        it('service should return an id of contact', () => {
            const result = '65b2e9ec-9c84-4d85-9073-86b1d875ade8';

            jest.spyOn(contactService, 'deleteContact').mockImplementation(() => result);
            expect(contactController.deleteContactById(result)).toBe<string>(result);
        });
    });
});
