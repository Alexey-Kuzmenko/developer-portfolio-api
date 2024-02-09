import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SkillModel } from './skill.model';
import { SkillService } from './skill.service';
import { DocumentType } from '@typegoose/typegoose';
import { SkillDto } from './dto/skill.dto';
import { ApiKeyAuthGuard } from '../auth/guards/api-key.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('skills')
export class SkillController {
    constructor(private readonly skillService: SkillService) { }

    @UseGuards(ApiKeyAuthGuard)
    @Get()
    async getSkills(): Promise<DocumentType<SkillModel>[]> {
        return this.skillService.getAllSkills()
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post()
    addSkill(@Body() dto: SkillDto): Promise<DocumentType<SkillModel>> {
        return this.skillService.createSkill(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateSkillById(@Param('id') id: string, @Body() dto: Omit<SkillModel, '_id'>): Promise<DocumentType<SkillModel>> {
        return this.skillService.updateSkill(dto, id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteSkillById(@Param('id') id: string): Promise<string> {
        return this.skillService.deleteSkill(id)
    }
}
