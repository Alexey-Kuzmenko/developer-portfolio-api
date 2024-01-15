import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SkillModel } from './skill.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { SkillDto } from './dto/skill.dto';
import { SKILL_ALREADY_EXISTS, SKILL_NOT_FOUND } from './skill.constants';

@Injectable()
export class SkillService {
    constructor(@InjectModel(SkillModel) private readonly skillModel: ModelType<SkillModel>) { }

    async getAllSkills(): Promise<DocumentType<SkillModel>[]> {
        return this.skillModel.find()
    }

    async createSkill(dto: SkillDto): Promise<SkillModel> {
        const skill: SkillModel = await this.skillModel.findOne({ slug: dto.slug }).exec()

        if (skill) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: SKILL_ALREADY_EXISTS
            }, HttpStatus.CONFLICT)
        } else {
            return this.skillModel.create(dto)
        }

    }

    async updateSkill(dto: SkillDto, id: string): Promise<string> {
        const skill: SkillModel = await this.skillModel.findById(id).exec()

        if (!skill) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: SKILL_NOT_FOUND
            }, HttpStatus.NOT_FOUND)
        } else {
            this.skillModel.findByIdAndUpdate(id, dto)
            return `Skill with id: ${id}, successfully updated`
        }
    }

    async deleteSkill(id: string): Promise<string> {
        this.skillModel.findByIdAndDelete(id)
        return `Skill with id: ${id}, successfully deleted`
    }

}
