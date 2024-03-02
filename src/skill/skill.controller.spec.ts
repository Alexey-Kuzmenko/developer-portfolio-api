import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { SkillModel } from './skill.model';

describe('SkillController', () => {
  let controller: SkillController;
  let service: SkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [SkillService]
    }).compile();

    controller = module.get<SkillController>(SkillController);
    service = module.get<SkillService>(SkillService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('SkillService', () => {
    it('service should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getSkills', () => {
    it('service should return array of skills', () => {
      const result = [];

      jest.spyOn(service, 'getAllSkills').mockImplementation(() => result);
      expect(controller.getSkills()).toBe<SkillModel[]>(result);
    });
  });

  describe('addSkill', () => {
    it('service should created skill', () => {
      const result: SkillModel = {
        _id: 'fd3a8d33-24c0-41f2-8d75-076f9d756cd1',
        slug: 'nestjs',
        label: 'NestJS',
        iconClass: 'test'
      };

      jest.spyOn(service, 'createSkill').mockImplementation(() => result);
      expect(controller.addSkill(result)).toBe<SkillModel>(result);
    });
  });

  describe('updateSkillById', () => {
    it('service should return id of skill', () => {
      const result = 'fd3a8d33-24c0-41f2-8d75-076f9d756cd1';
      const mockDto: SkillModel = {
        _id: 'fd3a8d33-24c0-41f2-8d75-076f9d756cd1',
        slug: 'nestjs',
        label: 'NestJS',
        iconClass: 'test'
      };

      jest.spyOn(service, 'updateSkill').mockImplementation(() => result);
      expect(controller.updateSkillById(result, mockDto)).toBe<string>(result);
    });
  });

  describe('deleteSkillById', () => {
    it('service should return id of skill', () => {
      const result = 'fd3a8d33-24c0-41f2-8d75-076f9d756cd1';

      jest.spyOn(service, 'deleteSkill').mockImplementation(() => result);
      expect(controller.deleteSkillById(result)).toBe<string>(result);
    });
  });

});
