import { Prop, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class AttachmentSchema {
  @Prop({ required: true })
  public title!: string;

  @Prop({ required: true })
  public fileName!: string;

  @prop({ required: true })
  public key!: string; // S3 key

  @Prop({ required: true })
  public url!: string; // S3 url

  @Prop({ required: true })
  public contentType!: string;
}

export class CourseSectionSchema {
  @Prop({ required: true })
  public title!: string;

  @Prop({ required: true, type: () => [AttachmentSchema] })
  public content!: AttachmentSchema[];
}

class CourseMaterialSchema extends TimeStamps {
  @Prop({ required: true, unique: true })
  public courseId!: string;

  @Prop({ required: true, type: () => [CourseSectionSchema] })
  public sections!: CourseSectionSchema[];
}

export default CourseMaterialSchema;
