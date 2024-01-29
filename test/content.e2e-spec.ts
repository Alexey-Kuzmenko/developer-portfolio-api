import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Types, disconnect } from 'mongoose';
import { ContentType } from '../src/content/content.model';
import { CreateContentDto } from '../src/content/dto/create-content.dto';
import { CONTENT_BY_ID_NOT_FOUND } from '../src/content/content.constants';

const testId: string = new Types.ObjectId().toHexString()

const testDto: CreateContentDto = {
    type: ContentType.ABOUT,
    eng: {
        title: 'About me',
        body: 'lorem impuls',
        links: [{ label: 'GitHub', href: '' }]
    },
    ua: {
        title: 'Про мене',
        body: 'текст',
        links: [{ label: 'GitHub', href: '' }]
    }
}

describe('ContentController (e2e)', () => {
    let app: INestApplication;
    let contentId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('createPageContent (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/content/create')
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                expect(body._id).toBeDefined()
                contentId = body._id
                console.log(body);
            })
    })

    it('createPageContent (POST) - failed', async () => {
        return request(app.getHttpServer())
            .post('/content/create')
            .send(testDto)
            .expect(409)
            .then(({ body }: request.Response) => {
                expect(body.error).toBeDefined()
                console.log(body);
            })
    })

    it('getPagesContent (GET)', async () => {
        return request(app.getHttpServer())
            .get('/content')
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(1)
                console.log(body);
            })
    });

    it('getContent (GET) - success', async () => {
        return request(app.getHttpServer())
            .get('/content/about/eng')
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.title).toBe(testDto.eng.title)
                console.log(body);
            })
    });

    it('updateContent (PATCH) - success', async () => {
        return request(app.getHttpServer())
            .patch(`/content/${contentId}/ua`)
            .send({ ...testDto.ua, body: 'Додано Тестовий текст' })
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.ua.body).toBe('Додано Тестовий текст')
                console.log(body);
            })
    })

    it('updateContent (PATCH) - failed', async () => {
        return request(app.getHttpServer())
            .patch('/content/' + testId + '/ua')
            .send({ ...testDto.ua, body: 'Тестовий текст' })
            .expect(404)
            .then(({ body }: request.Response) => {
                expect(body.message).toBe(CONTENT_BY_ID_NOT_FOUND)
                console.log(body);
            })
    })

    it('deletePageContent (DELETE) - success', async () => {
        return request(app.getHttpServer())
            .delete(`/content/${contentId}`)
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
