import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { ProjectModel } from './project.model';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get()
    getProjects(): Array<ProjectModel> {
        return this.projectService.getAllProjects()
    }

    @Post()
    createProject(@Body() dto: CreateProjectDto): ProjectModel {
        return this.projectService.createProject(dto)
    }

    @Get(':id')
    getProjectById(@Param('id') id: string): ProjectModel {
        return this.projectService.getProjectById(id)
    }

    @Delete(':id')
    deleteProjectById(@Param('id') id: string): string {
        return this.projectService.deleteProjectById(id)
    }

    @Patch(':id')
    updateProjectById(@Param('id') id: string, @Body() dto: CreateProjectDto): string {
        return this.projectService.updateProjectById(id, dto)
    }

}
