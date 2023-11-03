import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SkillModel } from './skill.model';

@Controller('skills')
export class SkillController {
    @Get()
    async getSkills() { }

    @Post()
    async addSkill(@Body() dto: Omit<SkillModel, '_id'>) { }

    @Patch(':id')
    async changeSkillById(@Param('id') id: string, @Body() dto: Omit<SkillModel, '_id'>) { }

    @Delete(':id')
    async deleteSkillById(@Param('id') id: string) { }
}
