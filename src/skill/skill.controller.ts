import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SkillModel } from './skill.model';
import { SkillService } from './skill.service';

@Controller('skills')
export class SkillController {
    constructor(private readonly skillService: SkillService) { }

    @Get()
    async getSkills(): Promise<Array<SkillModel>> {
        return this.skillService.getAllSkills()
    }

    @Post()
    async addSkill(@Body() dto: Omit<SkillModel, '_id'>): Promise<SkillModel> {
        return this.skillService.createSkill(dto)
    }

    @Patch(':id')
    async updateSkillById(@Param('id') id: string, @Body() dto: Omit<SkillModel, '_id'>): Promise<string> {
        return this.skillService.updateSkill(dto, id)
    }

    @Delete(':id')
    async deleteSkillById(@Param('id') id: string): Promise<string> {
        return this.skillService.deleteSkill(id)
    }
}
