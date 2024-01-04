import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

enum IconType {
    TELEGRAM = 'telegram',
    EMAIL = 'email',
    LINKED_IN = 'linkedIn',
    INSTAGRAM = 'instagram'
}

export interface ContactModel extends Base { }
export class ContactModel extends TimeStamps {
    @prop({ type: () => String })
    label: string

    @prop({ type: () => String })
    body: string

    @prop({ type: () => String })
    href: string

    @prop({ enum: IconType })
    iconType: IconType

    @prop()
    atl?: string
}
