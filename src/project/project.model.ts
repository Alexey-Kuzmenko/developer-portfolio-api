import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

class ProjectTechnology {
    @prop({ type: () => String })
    iconClass: string
    @prop({ type: () => String })
    label: string
}

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
    image: string

    @prop()
    body: string

    @prop({ type: () => [ProjectTechnology], _id: false })
    technologies: Array<ProjectTechnology>
}
