import { z } from "zod";
import { ObjectIdString, UUIDString } from "../commonSchemas";

export class AIDto {
  public static createChat = {
    body: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString.optional(),
      attachmentId: ObjectIdString.optional(),
    }),
  };
  public static chatCourseBot = {
    body: z.object({
      chatId: ObjectIdString,
      message: z.string().min(1).max(5000),
    }),
  };

  public static summarizeDocument = {
    body: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString,
      attachmentId: ObjectIdString,
    }),
  };

  public static answerFlashcard = {
    body: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString,
      attachmentId: ObjectIdString,
      questionId: ObjectIdString,
      answer: z.string().min(1).max(1000),
    }),
  };

  public static getChat = {
    params: z.object({
      chatId: ObjectIdString,
    }),
  };

  public static getExamQuestions = {
    body: z.object({
      courseId: UUIDString,
      numMCQ: z.number().int().positive(),
      numTF: z.number().int().positive(),
      numFlashCards: z.number().int().positive(),
    }),
  };

  public static answerExamQuestions = {
    body: z.object({
      courseId: UUIDString,
      answers: z.array(
        z.object({
          questionId: ObjectIdString,
          studentAnswer: z.string().min(1).max(1000),
        }),
      ),
    }),
  };
}
