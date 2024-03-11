import { z } from 'zod';

const courseId = z.string().uuid();

export class CourseMaterialDTO {
  public static createCourseMaterial = {
    body: z.object({
      courseId,
    }),
  };

  public static getCourseMaterial = {
    params: z.object({
      courseId,
    }),
  };

  public static addSection = {
    body: z.object({
      section: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),

    params: z.object({
      courseId,
    }),
  };
}
