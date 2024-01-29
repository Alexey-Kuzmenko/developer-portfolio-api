import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectModel } from './project.model';
import { ProjectDto } from './dto/project.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { PROJECT_ALREADY_EXISTS, PROJECT_NOT_FOUND } from './project.constants';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(ProjectModel) private readonly projectModel: ModelType<ProjectModel>) { }

    async getAllProjects(): Promise<DocumentType<ProjectModel>[]> {
        return this.projectModel.find().exec()
    }

    async createProject(dto: ProjectDto): Promise<DocumentType<ProjectModel>> {
        const project: ProjectModel = await this.projectModel.findOne({ name: dto.name }).exec()

        if (project) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: PROJECT_ALREADY_EXISTS
            }, HttpStatus.CONFLICT)
        } else {
            return this.projectModel.create(dto)
        }

    }

    async getProjectById(id: string): Promise<ProjectModel> {
        const project: ProjectModel = await this.projectModel.findById(id).exec()

        if (!project) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: PROJECT_NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        } else {
            return project
        }

    }

    async deleteProjectById(id: string): Promise<string> {
        this.projectModel.findByIdAndDelete(id).exec()
        return `Project with id: ${id} successfully deleted`
    }

    async updateProjectById(id: string, dto: ProjectDto): Promise<DocumentType<ProjectModel>> {
        const project: ProjectModel = await this.projectModel.findById(id).exec()

        if (!project) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: PROJECT_NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        } else {
            return this.projectModel.findByIdAndUpdate(id, dto, { new: true })
        }
    }

}
