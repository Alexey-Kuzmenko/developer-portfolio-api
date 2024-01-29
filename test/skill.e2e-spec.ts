import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Types, disconnect } from 'mongoose';
import { SkillDto } from '../src/skill/dto/skill.dto';
import { SKILL_ALREADY_EXISTS, SKILL_NOT_FOUND } from '../src/skill/skill.constants';

const testId: string = new Types.ObjectId().toHexString()

const testDto: SkillDto = {
    slug: 'react',
    label: 'React',
    iconClass: 'devicon-react-original'
}

describe('SkillController (e2e)', () => {
    let app: INestApplication;
    let skillId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('addSkill (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/skills')
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                expect(body._id).toBeDefined()
                skillId = body._id
                console.log(body._id);
            })
    })

    it('createProject (POST) - failed', async () => {
        return request(app.getHttpServer())
            .post('/skills')
            .send(testDto)
            .expect(409)
            .then(({ body }: request.Response) => {
                expect(body.error).toBe(SKILL_ALREADY_EXISTS)
                console.log(body);
            })
    })

    it('getSkills (GET)', async () => {
        return request(app.getHttpServer())
            .get('/skills')
            .send(testDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(1)
                console.log(body);
            })
    });

    it('updateSkillById (PATCH) - success', async () => {
        return request(app.getHttpServer())
            .patch('/skills/' + skillId)
            .send({ ...testDto, label: 'Next.js' })
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.label).toBe('Next.js')
                console.log(body);
            })
    });

    it('updateSkillById (PATCH) - failed', async () => {
        return request(app.getHttpServer())
            .patch('/skills/' + testId)
            .send({ ...testDto, label: 'Next.js' })
            .expect(404)
            .then(({ body }: request.Response) => {
                expect(body.error).toBe(SKILL_NOT_FOUND)
                console.log(body);
            })
    });

    it('deleteSkillById (DELETE) - success', async () => {
        return request(app.getHttpServer())
            .delete('/skills/' + skillId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body).toBeDefined()
                console.log(body);
            })
    })

    afterAll(async () => {
        await disconnect()
    });

})