import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface SkillModel extends Base { }
export class SkillModel extends TimeStamps {
    @prop({ type: () => String })
    slug: string
    @prop({ type: () => String })
    label: string
    @prop({ type: () => String })
    iconClass: string
}