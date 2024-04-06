import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';
import { ProjectModel } from './project.model';
import { DocumentType } from '@typegoose/typegoose';
import { ApiKeyAuthGuard } from '../auth/guards/api-key.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @UseGuards(ApiKeyAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    @ApiOkResponse({ description: 'Returns all projects' })
    async getProjects(): Promise<DocumentType<ProjectModel>[]> {
        return this.projectService.getAllProjects();
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    @Post()
    @ApiCreatedResponse({ description: 'New project successfully added' })
    async createProject(@Body() dto: ProjectDto): Promise<DocumentType<ProjectModel>> {
        return this.projectService.createProject(dto);
    }

    @UseGuards(ApiKeyAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    @ApiOkResponse({ description: 'Returns a project with a matching id' })
    async getProjectById(@Param('id') id: string): Promise<ProjectModel> {
        return this.projectService.getProjectById(id);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    @Patch(':id')
    @ApiOkResponse({ description: 'Project successfully updated' })
    async updateProjectById(@Param('id') id: string, @Body() dto: ProjectDto): Promise<DocumentType<ProjectModel>> {
        return this.projectService.updateProjectById(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    @ApiOkResponse({ description: 'Project successfully deleted' })
    deleteProjectById(@Param('id') id: string): Promise<string> {
        return this.projectService.deleteProjectById(id);
    }
}
