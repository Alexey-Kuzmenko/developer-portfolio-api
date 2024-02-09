import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { INCORRECT_USER_PASSWORD, USER_ALREADY_EXIST, USER_NOT_FOUND } from '../src/user/user.constants';

const testDto: CreateUserDto = {
    email: 'guest@gmail.com',
    password: 'guestUser11'
}

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('signUp (Post) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                expect(body.email).toBe(testDto.email)
                console.log(body);
            })
    })

    it('signUp (Post) - fail', async () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(testDto)
            .expect(409)
            .then(({ body }: request.Response) => {
                expect(body.error).toBe(USER_ALREADY_EXIST)
                console.log(body);
            })
    })

    it('signIn (Post) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(testDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined()
                console.log(body);
            })
    })

    it('signIn (Post) - incorrect user password', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...testDto, password: '11' })
            .expect(401)
            .then(({ body }: request.Response) => {
                expect(body.error).toBe(INCORRECT_USER_PASSWORD)
                console.log(body);
            })
    })

    it('signIn (Post) - user not found', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'user@ukr.net', password: '11' })
            .expect(404)
            .then(({ body }: request.Response) => {
                expect(body.error).toBe(USER_NOT_FOUND)
                console.log(body);
            })
    })

    afterAll(async () => {
        await disconnect()
    });
})
