import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { SkillModel } from './skill.model';
import { SkillService } from './skill.service';
import { DocumentType } from '@typegoose/typegoose';
import { SkillDto } from './dto/skill.dto';
import { ApiKeyAuthGuard } from '../auth/guards/api-key.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('skills')
@Controller('skills')
export class SkillController {
    constructor(private readonly skillService: SkillService) { }

    @UseGuards(ApiKeyAuthGuard)
    @Get()
    @ApiOkResponse({ description: 'Returns all skills' })
    async getSkills(): Promise<DocumentType<SkillModel>[]> {
        return this.skillService.getAllSkills();
    }

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post()
    @ApiCreatedResponse({ description: 'New skill successfully added' })
    addSkill(@Body() dto: SkillDto): Promise<DocumentType<SkillModel>> {
        return this.skillService.createSkill(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiOkResponse({ description: 'Skill successfully updated' })
    async updateSkillById(@Param('id') id: string, @Body() dto: Omit<SkillModel, '_id'>): Promise<DocumentType<SkillModel>> {
        return this.skillService.updateSkill(dto, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOkResponse({ description: 'Skill successfully deleted' })
    async deleteSkillById(@Param('id') id: string): Promise<string> {
        return this.skillService.deleteSkill(id);
    }
}
