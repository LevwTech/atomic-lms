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
}
