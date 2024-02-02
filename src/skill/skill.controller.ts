import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SkillModel } from './skill.model';
import { SkillService } from './skill.service';
import { DocumentType } from '@typegoose/typegoose';
import { SkillDto } from './dto/skill.dto';
import { ApiKeyAuthGuard } from 'src/auth/guards/api-key.guard';

@Controller('skills')
export class SkillController {
    constructor(private readonly skillService: SkillService) { }

    @UseGuards(ApiKeyAuthGuard)
    @Get()
    async getSkills(): Promise<DocumentType<SkillModel>[]> {
        return this.skillService.getAllSkills()
    }

    @UsePipes(new ValidationPipe())
    @Post()
    addSkill(@Body() dto: SkillDto): Promise<DocumentType<SkillModel>> {
        return this.skillService.createSkill(dto)
    }

    @Patch(':id')
    async updateSkillById(@Param('id') id: string, @Body() dto: Omit<SkillModel, '_id'>): Promise<DocumentType<SkillModel>> {
        return this.skillService.updateSkill(dto, id)
    }

    @Delete(':id')
    async deleteSkillById(@Param('id') id: string): Promise<string> {
        return this.skillService.deleteSkill(id)
    }
}
