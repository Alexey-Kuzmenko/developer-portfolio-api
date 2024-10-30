import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ImageModel extends Base { }
export class ImageModel extends TimeStamps {
    @prop({ type: () => String })
    url: string;

    @prop({ type: () => String })
    name: string;
}