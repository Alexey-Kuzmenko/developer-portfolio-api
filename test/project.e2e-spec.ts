import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Types, disconnect } from 'mongoose';
import { ProjectDto } from 'src/project/dto/project.dto';
import { PROJECT_ALREADY_EXISTS, PROJECT_NOT_FOUND } from '../src/project/project.constants';

const testId: string = new Types.ObjectId().toHexString();

const testDto: ProjectDto = {
    name: 'Budget app',
    tags: ['React', 'TypeScript', 'TypeScript', 'Redux'],
    description: 'Budget App is a personal budgeting app that helps you track your income.',
    link: 'https://budget-app-ng0j.onrender.com/',
    repoLink: 'https://github.com/Alexey-Kuzmenko/budget-app',
    image: 'img2.png',
    body: 'testing',
    technologies: [{
        iconClass: 'devicon-react-original',
        label: 'React'
    }]
};

describe('ProjectController (e2e)', () => {
    let app: INestApplication;
    let projectId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('createProject (POST)', async () => {
        return request(app.getHttpServer())
            .post('/projects')
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                expect(body._id).toBeDefined();
                projectId = body._id;
            });
    });

    it('createProject (POST) - failed', async () => {
        return request(app.getHttpServer())
            .post('/projects')
            .send(testDto)
            .expect(409)
            .then(({ body }: request.Response) => {
                expect(body.error).toBe(PROJECT_ALREADY_EXISTS);
            });
    });

    it('getProjects (GET) - success', async () => {
        return request(app.getHttpServer())
            .get('/projects')
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(1);
            });
    });

    it('getProjectById (GET) - success', async () => {
        return request(app.getHttpServer())
            .get('/projects/' + projectId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body._id).toBe(projectId);
            });
    });

    it('getProjectById (GET) - failed', async () => {
        return request(app.getHttpServer())
            .get('/projects/' + testId)
            .expect(404)
            .then(({ body }: request.Response) => {
                expect(body.error).toBe(PROJECT_NOT_FOUND);
            });
    });

    it('updateProjectById (PATCH) - success', async () => {
        return request(app.getHttpServer())
            .patch('/projects/' + projectId)
            .send({ ...testDto, name: 'Pet project' })
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.name).toBe('Pet project');
            });
    });

    it('updateProjectById (PATCH) - failed', async () => {
        return request(app.getHttpServer())
            .patch('/projects/' + testId)
            .send({ ...testDto, name: 'Pet project' })
            .expect(404)
            .then(({ body }: request.Response) => {
                expect(body.error).toBe(PROJECT_NOT_FOUND);
            });
    });

    it('deleteProjectById (DELETE) - success', async () => {
        return request(app.getHttpServer())
            .delete('/projects/' + projectId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body).toBeDefined();
            });
    });

    afterAll(async () => {
        await disconnect();
    });
});