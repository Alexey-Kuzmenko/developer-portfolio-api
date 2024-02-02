import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';
import { ProjectModel } from './project.model';
import { DocumentType } from '@typegoose/typegoose';
import { ApiKeyAuthGuard } from 'src/auth/guards/api-key.guard';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @UseGuards(ApiKeyAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async getProjects(): Promise<DocumentType<ProjectModel>[]> {
        return this.projectService.getAllProjects()
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createProject(@Body() dto: ProjectDto): Promise<DocumentType<ProjectModel>> {
        return this.projectService.createProject(dto)
    }

    @UseGuards(ApiKeyAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getProjectById(@Param('id') id: string): Promise<ProjectModel> {
        return this.projectService.getProjectById(id)
    }

    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    async updateProjectById(@Param('id') id: string, @Body() dto: ProjectDto): Promise<DocumentType<ProjectModel>> {
        return this.projectService.updateProjectById(id, dto)
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    deleteProjectById(@Param('id') id: string): Promise<string> {
        return this.projectService.deleteProjectById(id)
    }


}
