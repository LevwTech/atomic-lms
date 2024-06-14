import { z } from "zod";
import { Types } from "mongoose";
import { ObjectIdString, UUIDString } from "../commonSchemas";

export class CourseMaterialDTO {
  private static section = z.object({
    title: z.string(),
    description: z.string().optional(),
  });

  public static createCourseMaterial = {
    body: z.object({
      courseId: UUIDString,
      sections: z.array(this.section).optional(),
    }),
  };

  public static getCourseMaterial = {
    params: z.object({
      courseId: UUIDString,
    }),
  };

  public static getSection = {
    params: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString,
    }),
  };

  public static addSection = {
    body: z.object({
      section: this.section,
    }),

    params: z.object({
      courseId: UUIDString,
    }),
  };

  public static editSection = {
    body: z.object({
      section: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    }),

    params: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString,
    }),
  };

  public static removeSection = {
    params: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString,
    }),
  };

  public static addAttachment = {
    body: z.object({
      title: z.string().min(3).optional(),
    }),

    params: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString,
    }),
  };

  public static getAttachment = {
    params: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString,
      attachmentId: ObjectIdString,
    }),
  };

  public static editAttachment = {
    body: z.object({
      title: z.string(),
    }),

    params: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString,
      attachmentId: ObjectIdString,
    }),
  };

  public static removeAttachment = {
    params: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString,
      attachmentId: ObjectIdString,
    }),
  };
}
