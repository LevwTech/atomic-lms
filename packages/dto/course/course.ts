import { z } from "zod";
import { studentCoursesOptions } from "@atomic/common";

export class CourseDTO {
  public static createCourseGroup = {
    body: z.object({
      name: z.string().min(4).max(40),
      courseIds: z.array(z.string().uuid()).optional(),
    }),
  };

  public static deleteCourses = {
    body: z.object({
      ids: z.array(z.string().uuid()),
    }),
  };

  public static getStudentCourses = {
    query: z.object({
      option: z.nativeEnum(studentCoursesOptions),
    }),
  };

  public static createBaseCourse = {
    body: z.object({
      name: z.string().min(4).max(40),
      code: z.string().min(4).max(10),
      description: z.string().min(10).max(500).optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      academicDuration: z.string().min(4).max(40).optional(),
      academicYear: z.string().min(4).max(40).optional(),
      image: z.string().url(),
      prerequisiteCourseIds: z.array(z.string().uuid()).optional(),
      prerequisiteCourseGroupIds: z.array(z.string().uuid()).optional(),
      studentIds: z.array(z.string().uuid()).optional(),
      teacherIds: z.array(z.string().uuid()).optional(),
    }),
  };

  public static createCourse = {
    body: z.object({
      parentCourseId: z.string().min(4).max(100),
      description: z.string().min(10).max(500).optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      academicDuration: z.string().min(4).max(40).optional(),
      academicYear: z.string().min(4).max(40).optional(),
      prerequisiteCourseIds: z.array(z.string().uuid()).optional(),
      prerequisiteCourseGroupIds: z.array(z.string().uuid()).optional(),
      studentsUserNames: z.array(z.string().uuid()).optional(),
      teachersUserNames: z.array(z.string().uuid()).optional(),
      code: z.string().min(4).max(10),
    }),
  };

  public static deleteCourseGroup = {
    body: z
      .object({
        id: z.string().uuid(),
        name: z.string().min(4).max(40),
      })
      .partial()
      .refine(
        (data) => {
          if (data.id && data.name) {
            return false;
          }
          if (!data.id && !data.name) {
            return false;
          }
          return true;
        },
        {
          message: "Must provide either id or name",
        },
      ),
  };

  public static deleteCourseGroups = {
    body: z
      .object({
        ids: z.array(z.string().uuid()),
        names: z.array(z.string().min(4).max(40)),
      })
      .partial()
      .refine(
        (data) => {
          if (data.ids && data.ids.length && data.names && data.names.length) {
            return false;
          }
          if (
            (!data.ids || !data.ids.length) &&
            (!data.names || !data.names.length)
          ) {
            return false;
          }
          return true;
        },
        {
          message: "Must provide either ids or names",
        },
      ),
  };

  public static enrollUsersInCourse = {
    body: z.object({
      usernames: z.array(z.string().min(4).max(40)),
      courseIds: z.array(z.string().uuid()),
    }),
  };

  public static addTeachersInCourse = {
    body: z.object({
      usernames: z.array(z.string().min(4).max(40)),
      courseIds: z.array(z.string().uuid()),
    }),
  };

  public static editCourse = {
    body: z.object({
      id: z.string().uuid(),
      name: z.string().min(4).max(40).optional(),
      code: z.string().min(4).max(10).optional(),
      image: z.string().url().optional(),
      description: z.string().min(10).max(500).optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      academicDuration: z.string().min(4).max(40).optional(),
      academicYear: z.string().min(4).max(40).optional(),
    }),
  };

  public static editCourseGroup = {
    body: z.object({
      id: z.string().uuid(),
      name: z.string().min(4).max(40).optional(),
      courseIdsToAdd: z.array(z.string().uuid()).optional(),
      courseIdsToRemove: z.array(z.string().uuid()).optional(),
    }),
  };

  public static editCoursePrerequisiteCourses = {
    body: z.object({
      id: z.string().uuid(),
      prerequisiteCourseIdsToAdd: z.array(z.string().uuid()).optional(),
      prerequisiteCourseIdsToRemove: z.array(z.string().uuid()).optional(),
    }),
  };

  public static editCoursePrerequisiteCourseGroups = {
    body: z.object({
      id: z.string().uuid(),
      prerequisiteCourseGroupIdsToAdd: z.array(z.string().uuid()).optional(),
      prerequisiteCourseGroupIdsToRemove: z.array(z.string().uuid()).optional(),
    }),
  };
}
