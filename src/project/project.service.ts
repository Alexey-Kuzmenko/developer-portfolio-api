import { Injectable } from '@nestjs/common';
import { ProjectModel } from './project.model';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
    private projects: Array<ProjectModel> = [
        {
            _id: '9d975cb9-ccc4-43eb-a626-f5f94034de2b',
            name: 'Budgte app',
            tags: ['React', 'TypeScript'],
            description: 'Budget App is a personal budgeting app that helps you track your income, expenses, and profits.',
            link: 'https://budget-app-ng0j.onrender.com',
            repoLink: 'https://github.com/Alexey-Kuzmenko/budget-app',
            previewImage: '',

        },
        {
            _id: '568ced6c-5ae6-442f-87dd-ce300be50d7b',
            name: 'Quiz App',
            tags: ['React', 'JavaScript'],
            description: 'In this app, you can create custom quizzes or play already-created quizzes.',
            link: 'https://quiz-game-n2q7.onrender.com',
            repoLink: 'https://github.com/Alexey-Kuzmenko/react-quiz',
            previewImage: '',

        },
    ]

    getAllProjects(): Array<ProjectModel> {
        return this.projects
    }

    createProject(dto: ProjectDto): ProjectModel {
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

    updateProjectById(id: string, dto: ProjectDto): string | undefined {
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
