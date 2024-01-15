import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface ProjectModel extends Base { }
export class ProjectModel extends TimeStamps {
    @prop({ type: () => String })
    name: string
    @prop({ type: () => [String] })
    tags: Array<string>
    @prop({ type: () => String })
    description: string
    @prop({ type: () => String })
    link: string
    @prop({ type: () => String })
    repoLink: string
    @prop({ type: () => String })
    previewImage: string
    @prop({ type: () => [String] })
    images?: Array<string>
    @prop()
    body?: string
    @prop({ type: () => [Object] })
    technologies: Array<{ iconClass: string, label: string }>
}
