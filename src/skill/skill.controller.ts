import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SkillModel } from './skill.model';
import { SkillService } from './skill.service';

@Controller('skills')
export class SkillController {
    constructor(private readonly skillService: SkillService) { }

    @Get()
    getSkills(): Array<SkillModel> {
        return this.skillService.getAllSkills()
    }

    @Post()
    addSkill(@Body() dto: Omit<SkillModel, '_id'>): SkillModel {
        return this.skillService.createSkill(dto)
    }

    @Patch(':id')
    updateSkillById(@Param('id') id: string, @Body() dto: Omit<SkillModel, '_id'>): string {
        return this.skillService.updateSkill(dto, id)
    }

    @Delete(':id')
    deleteSkillById(@Param('id') id: string): string {
        return this.skillService.deleteSkill(id)
    }
}
