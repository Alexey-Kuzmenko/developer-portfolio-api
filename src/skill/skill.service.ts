import { Injectable } from '@nestjs/common';
import { SkillModel } from './skill.model';

@Injectable()
export class SkillService {
    private skills: Array<SkillModel> = []

    getAllSkills(): Array<SkillModel> {
        return this.skills
    }

    createSkill(dto: Omit<SkillModel, '_id'>): SkillModel {
        const skill: SkillModel = {
            _id: Math.floor(Math.random() * 1000).toString(),
            ...dto
        }

        this.skills.push(skill)
        return skill

    }

    updateSkill(dto: Omit<SkillModel, '_id'>, id: string): string {
        const skill: SkillModel = this.skills.find((skill: SkillModel) => skill._id === id)

        if (skill) {
            const skillIndex: number = this.skills.indexOf(skill)
            const skillsCopy: Array<SkillModel> = [...this.skills]
            skillsCopy[skillIndex] = { _id: skill._id, ...dto }
            this.skills = skillsCopy
        }

        return id
    }


    deleteSkill(id: string): string {
        this.skills = this.skills.filter((skill) => skill._id !== id)
        return id
    }

}
