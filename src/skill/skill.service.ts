import { Injectable } from '@nestjs/common';
import { SkillModel } from './skill.model';

@Injectable()
export class SkillService {
    private skills: Array<SkillModel> = [
        {
            _id: 'b84eefd6-c65e-430e-bfde-9ee77237099f',
            slug: 'html5',
            label: 'HTML',
            iconClass: 'devicon-html5-plain'
        },
        {
            _id: 'b01f4c08-c921-4c90-88b8-8bf9f5917641',
            slug: 'sass',
            label: 'SASS(SCSS)',
            iconClass: 'devicon-sass-original'
        },
        {
            _id: '0e438855-7ac1-4627-9551-b72885aba393',
            slug: 'javascript',
            label: 'JavaScript',
            iconClass: 'devicon-javascript-plain'
        },
        {
            _id: '2d0bfe9e-3de4-4141-8f1b-ce68702757ec',
            slug: 'typescript',
            label: 'TypeScript',
            iconClass: 'devicon-typescript-plain'
        },
        {
            _id: 'c10d5ca6-820a-4c84-b341-d963090e814f',
            slug: 'react',
            label: 'React',
            iconClass: 'devicon-react-original'
        },
        {
            _id: '4a525ae8-690c-499e-8b8a-2297aec56dc0',
            slug: 'next.js',
            label: 'Next.js',
            iconClass: 'devicon-nextjs-plain'
        },
        {
            _id: 'ff3672be-c972-48a8-b546-cd0259279598',
            slug: 'nestjs',
            label: 'NestJS',
            iconClass: 'devicon-nestjs-plain'
        },
        {
            _id: 'f0218d24-9ad7-400e-ab8d-c29f5ebf2ab4',
            slug: 'firebase',
            label: 'Firebase',
            iconClass: 'devicon-firebase-plain'
        },
        {
            _id: '412d2fa4-aad3-4c18-8b34-f0720cafd0d6',
            slug: 'linux',
            label: 'Linux terminal',
            iconClass: 'devicon-linux-plain'
        },
    ]

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
