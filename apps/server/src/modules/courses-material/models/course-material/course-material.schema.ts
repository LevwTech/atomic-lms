import { Prop, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Schema, Types } from "mongoose";

export enum TFQuestionAnswer {
  TRUE = "true",
  FALSE = "false",
}

export enum QuestionTypes {
  MCQ = "mcq",
  TF = "tf",
  FLASHCARD = "flashcard",
}

export class TFQuestionSchema {
  @Prop({ required: false, type: Types.ObjectId })
  public _id?: Types.ObjectId;

  @Prop({ required: true, default: QuestionTypes.TF })
  public type!: QuestionTypes;

  @Prop({ required: true })
  public question!: string;

  @Prop({
    required: true,
    enum: [TFQuestionAnswer.TRUE, TFQuestionAnswer.FALSE],
  })
  public answer!: TFQuestionAnswer;

  @Prop({ required: true })
  public explanation!: string;

  @Prop({ required: true })
  public pageNumber!: number;

  @Prop({ required: true })
  public docId!: string;
}

export class MCQOptionSchema {
  @Prop({ required: true })
  public letter!: string;

  @Prop({ required: true })
  public text!: string;

  @Prop({ required: true })
  public isCorrect!: boolean;
}

export class MCQQuestionSchema {
  @Prop({ required: false, type: Types.ObjectId })
  public _id?: Types.ObjectId;

  @Prop({ required: true, default: QuestionTypes.MCQ })
  public type!: QuestionTypes;

  @Prop({ required: true })
  public question!: string;

  @Prop({ required: true, type: () => [MCQOptionSchema] })
  public options!: MCQOptionSchema[];

  @Prop({ required: true })
  public explanation!: string;

  @Prop({ required: true })
  public pageNumber!: number;

  @Prop({ required: true })
  public docId!: string;
}

export class FlashCardSchema {
  @Prop({ required: false, type: Types.ObjectId })
  public _id?: Types.ObjectId;

  @Prop({ required: true, default: QuestionTypes.FLASHCARD })
  public type!: QuestionTypes;

  @Prop({ required: true })
  public question!: string;

  @Prop({ required: true })
  public answer!: string;

  @Prop({ required: true })
  public explanation!: string;

  @Prop({ required: true })
  public pageNumber!: number;

  @Prop({ required: true })
  public docId!: string;
}
export class AttachmentSchema {
  @Prop({ required: true, type: Schema.Types.ObjectId })
  _id: string;

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

  @Prop({ required: true })
  public doesHaveChatBot!: boolean;

  @Prop({ required: true, type: () => [String] })
  public docIds!: string[];

  @Prop({ required: true })
  public isSummarized!: boolean;

  @Prop({ required: true })
  public summary!: string;

  @Prop({ required: true })
  public doesHaveFlashCards!: boolean;

  @Prop({ required: true, type: () => [FlashCardSchema] })
  public flashCards!: FlashCardSchema[];

  @Prop({ required: true })
  public doesHaveMCQs!: boolean;

  @Prop({ required: true, type: () => [MCQQuestionSchema] })
  public mcqQuestions!: MCQQuestionSchema[];

  @Prop({ required: true })
  public doesHaveTFs!: boolean;

  @Prop({ required: true, type: () => [TFQuestionSchema] })
  public tfQuestions!: TFQuestionSchema[];
}

export class CourseSectionSchema {
  @Prop({ required: true })
  public title!: string;

  @Prop({ required: false })
  public description?: string;

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
