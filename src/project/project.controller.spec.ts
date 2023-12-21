import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectModel } from './project.model';
import { ProjectDto } from './dto/project.dto';

describe('AppController', () => {
    let projectController: ProjectController;
    let projectService: ProjectService

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProjectController],
            providers: [ProjectService],
        }).compile();

        projectController = app.get<ProjectController>(ProjectController);
        projectService = app.get<ProjectService>(ProjectService)
    });

    describe('root', () => {
        it('service should be defined', () => {
            expect(projectService).toBeDefined();
        });

        it('controller should be defined', () => {
            expect(projectController).toBeDefined();
        });
    });

    describe('getAllProjects', () => {
        it('method should return an array of projects', () => {
            const result: Array<ProjectModel> = [{
                _id: '10',
                name: 'Developer portfolio',
                tags: [],
                description: 'Test',
                link: 'link to project',
                repoLink: 'lin to repo',
                previewImage: 'src/assets/img.webp',
            }];

            jest.spyOn(projectService, 'getAllProjects').mockImplementation(() => result)
            expect(projectController.getProjects()).toBe<Array<ProjectModel>>(result);
        });
    });

    describe('getProjectsById', () => {
        it('method should return projects object', () => {
            const projectId = 'a6sdsb8sdf10fk34lkf1ljhb2'

            const result: ProjectModel = {
                _id: 'a6sdsb8sdf10fk34lkf1ljhb2',
                name: 'Developer portfolio',
                tags: [],
                description: 'Test',
                link: 'link to project',
                repoLink: 'lin to repo',
                previewImage: 'src/assets/img.webp',
            };

            jest.spyOn(projectService, 'getProjectById').mockImplementation(() => result)
            expect(projectController.getProjectById(projectId)).toBe<ProjectModel>(result);
        });
    });

    describe('deleteProjectsById', () => {
        it('method should return an id of deleted projects', () => {
            const result = 'a6sdsb8sdf10fk34lkf1ljhb2'

            jest.spyOn(projectService, 'deleteProjectById').mockImplementation(() => result)
            expect(projectController.deleteProjectById(result)).toBe<string>(result);
        });
    });

    describe('updateProjectById', () => {
        it('method should return an id of updated projects', () => {
            const result = 'a6sdsb8sdf10fk34lkf1ljhb2'

            const dto: ProjectDto = {
                name: 'Budget app',
                tags: [],
                description: 'Budgeting app',
                link: 'link to project',
                repoLink: 'lin to repo',
                previewImage: 'src/assets/budget_app.webp',
            };

            jest.spyOn(projectService, 'updateProjectById').mockImplementation(() => result)
            expect(projectController.updateProjectById(result, dto)).toBe<string>(result);
        });
    });

});