import { Prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class MessageContentSchema {
  @Prop({ required: true })
  public content: string;
}

export class MessageSchema extends TimeStamps {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  data: MessageContentSchema;
}

class ChatSchema extends TimeStamps {
  @Prop({ required: true })
  public userId!: string;

  @Prop({ required: true })
  public sessionId!: string;

  @Prop({ required: true })
  public courseId!: string;

  @Prop({ required: false })
  public sectionId?: string;

  @Prop({ required: false })
  public attachmentId?: string;

  @Prop({ type: [MessageSchema], default: [] })
  public messages!: MessageSchema[];

  @Prop({ required: false })
  public title?: string;
}

export default ChatSchema;
