import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { IconType } from '../src/contact/contact.model';
import { Types, disconnect } from 'mongoose';
import { ContactDto } from '../src/contact/dto/contact.dto';
import { CONTACT_ALREADY_EXISTS } from '../src/contact/contact.constants';

const documentId = new Types.ObjectId().toHexString()

const testDto: ContactDto = {
    label: 'Instagram',
    body: 'Test',
    href: 'https://www.instagram.com/',
    iconType: IconType.INSTAGRAM,
}

describe('ContactController (e2e)', () => {
    let app: INestApplication;
    let contactId: string

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('createContact (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/contacts')
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                expect(body._id).toBeDefined()
                contactId = body._id
                console.log(body);
            })
    })

    it('createContact (POST) - fail', async () => {
        return request(app.getHttpServer())
            .post('/contacts')
            .send({ ...testDto })
            .expect(409)
            .then(({ body }: request.Response) => {
                expect(body.error).toBe(CONTACT_ALREADY_EXISTS)
            })
    })

    it('getContacts (GET)', async () => {
        return request(app.getHttpServer())
            .get('/contacts')
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(1)
                console.log(body);
            })
    });

    it('updateContact (PATCH) - success', async () => {
        return request(app.getHttpServer())
            .patch('/contacts/' + contactId)
            .send({ ...testDto, body: 'lorem' })
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.body).toBe('lorem')
                console.log(body);
            })
    })

    it('updateContact (PATCH) - field', async () => {
        return request(app.getHttpServer())
            .patch('/contacts/' + documentId)
            .send({ ...testDto, body: 'updated data' })
            .expect(404)
            .then(({ body }: request.Response) => {
                expect(body.error).toBeDefined()
                console.log(body);
            })
    })

    it('deleteContactById (DELETE) - success', async () => {
        return request(app.getHttpServer())
            .delete('/contacts/' + contactId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body).toBeDefined()
                console.log(body);
            })
    })

    afterAll(async () => {
        await disconnect()
    });
});