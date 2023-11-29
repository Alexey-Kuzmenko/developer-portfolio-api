import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
    @Get()
    async getProjects() { }

    @Post()
    async createProject(@Body() dto: CreateProjectDto) { }

    @Get(':id')
    async getProjectById(@Param('id') id: string) { }

    @Delete(':id')
    async deleteProjectById(@Param('id') id: string) { }

    @Patch(':id')
    async updateProjectById(@Param('id') id: string, @Body() dto: CreateProjectDto) { }

}
