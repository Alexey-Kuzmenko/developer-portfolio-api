import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';
import { ProjectModel } from './project.model';
import { DocumentType } from '@typegoose/typegoose';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get()
    async getProjects(): Promise<DocumentType<ProjectModel>[]> {
        return this.projectService.getAllProjects()
    }

    @Post()
    async createProject(@Body() dto: ProjectDto): Promise<DocumentType<ProjectModel>> {
        return this.projectService.createProject(dto)
    }

    @Get(':id')
    async getProjectById(@Param('id') id: string): Promise<ProjectModel> {
        return this.projectService.getProjectById(id)
    }

    @Delete(':id')
    deleteProjectById(@Param('id') id: string): Promise<string> {
        return this.projectService.deleteProjectById(id)
    }

    @Patch(':id')
    async updateProjectById(@Param('id') id: string, @Body() dto: ProjectDto): Promise<string> {
        return this.projectService.updateProjectById(id, dto)
    }

}
