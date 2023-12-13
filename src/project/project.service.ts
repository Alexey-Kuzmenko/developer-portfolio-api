import { Injectable } from '@nestjs/common';
import { ProjectModel } from './project.model';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
    private projects: Array<ProjectModel>

    getAllProjects(): Array<ProjectModel> {
        return this.projects
    }

    createProject(dto: CreateProjectDto): ProjectModel {
        const project: ProjectModel = {
            _id: Math.floor(Math.random() * 10_0000).toString(),
            ...dto
        }

        this.projects.push(project)
        return project
    }

    getProjectById(id: string): ProjectModel {
        const project: ProjectModel = this.projects.find(project => project._id === id)
        return project
    }

    deleteProjectById(id: string): string {
        this.projects = this.projects.filter(project => project._id !== id)
        return id
    }

    updateProjectById(id: string, dto: CreateProjectDto): string | undefined {
        const project: ProjectModel = this.projects.find(project => project._id === id)

        if (project) {
            const projectsCopy: Array<ProjectModel> = [...this.projects]
            const projectIndex: number = this.projects.indexOf(project)
            projectsCopy[projectIndex] = { _id: project._id, ...dto }
            this.projects = projectsCopy
            return id
        }

    }

}
