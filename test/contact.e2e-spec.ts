import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ContactModel } from '../src/contact/contact.model';
import { disconnect } from 'mongoose';

describe('ContactController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('getContacts (GET)', async () => {
        return request(app.getHttpServer())
            .get('/contacts')
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body).toBe<ContactModel[]>([])
            })
    });

    afterAll(async () => {
        await disconnect()
    });
});
