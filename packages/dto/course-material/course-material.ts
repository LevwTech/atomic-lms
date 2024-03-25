import { z } from 'zod';
import { Types } from 'mongoose';
import { ObjectIdString, UUIDString } from '../commonSchemas';

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

  public static addSection = {
    body: z.object({
      section: this.section,
    }),

    params: z.object({
      courseId: UUIDString,
    }),
  };

  public static removeSection = {
    params: z.object({
      courseId: UUIDString,
    }),
    query: z.object({
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

  public static removeAttachment = {
    params: z.object({
      courseId: UUIDString,
      sectionId: ObjectIdString,
    }),
    query: z.object({
      attachmentId: ObjectIdString,
    }),
  };
}
