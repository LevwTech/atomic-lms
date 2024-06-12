import { In, ILike } from "typeorm";
import { Course } from "./course.entity";
import { CourseDTO } from "@atomic/dto";
import { PostGresDataSource } from "../../../../app";
import { API_ERROR } from "../../../../common/helpers/throwApiError";
import { API_MESSAGES } from "../../../../common/helpers/apiMessages";
import { DTOBodyType } from "../../../../common/types/DTOType";
import CourseGroupModel from "../courseGroup/courseGroup.model";
import UserModel from "../../../users/models/user/user.model";
import CourseMaterialService from "../../../../modules/courses-material/services/course-material";

export default class CourseModel {
  public static async getAllCourses(
    page: number,
    limit: number,
    isBase?: string,
  ) {
    const where: any = {};
    if (isBase) {
      where.isBase = isBase === "true";
    }
    const [courses, totalCount] = await PostGresDataSource.getRepository(
      Course,
    ).findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: "ASC" },
      where,
    });

    return {
      courses: courses,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  public static async createBaseCourse({
    name,
    code,
    description,
    startDate,
    endDate,
    academicDuration,
    academicYear,
    image,
    prerequisiteCourseGroupIds,
    prerequisiteCourseIds,
    studentIds,
    teacherIds,
  }: DTOBodyType<typeof CourseDTO.createBaseCourse>) {
    const course = new Course();

    course.name = name;
    course.code = code;
    course.isBase = true;
    course.image = image;
    if (description) course.description = description;
    if (startDate) course.startDate = startDate;
    if (endDate) course.endDate = endDate;
    if (academicDuration) course.academicDuration = academicDuration;
    if (academicYear) course.academicYear = academicYear;
    if (prerequisiteCourseIds)
      course.prerequisiteCourses = Promise.resolve(
        await this.getCourses(prerequisiteCourseIds),
      );
    if (prerequisiteCourseGroupIds)
      course.prerequisiteCourseGroups = await CourseGroupModel.getCourseGroups(
        prerequisiteCourseGroupIds,
      );
    if (studentIds) {
      let students = await UserModel.getUsersByUsernames(studentIds);
      students = students.filter((student) => student.type === "STUDENT");
      course.students = Promise.resolve(students);
    }
    if (teacherIds) {
      let teachers = await UserModel.getUsersByUsernames(teacherIds);
      teachers = teachers.filter((teacher) => teacher.type === "TEACHER");
      course.teachers = Promise.resolve(teachers);
    }
    try {
      await PostGresDataSource.getRepository(Course).save(course);
      await CourseMaterialService.createCourseMaterial({
        courseId: course.id,
        sections: [
          {
            title: "Lectures",
            description: "Lectures for the course",
          },
          {
            title: "Exams",
            description: "Exams for the course",
          },
          {
            title: "Sheets",
            description: "Sheets for the course",
          },
          {
            title: "Projects",
            description: "Projects for the course",
          },
          {
            title: "Module information",
            description: "Information about the modules in the course",
          },
          {
            title: "Attendance",
            description: "Attendance for the course",
          },
          {
            title: "Announcements",
            description: "Announcements for the course",
          },
          {
            title: "Grades",
            description: "Grades for the course",
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }

  public static async createCourse({
    parentCourseId,
    description,
    startDate,
    endDate,
    academicDuration,
    academicYear,
    prerequisiteCourseIds,
    prerequisiteCourseGroupIds,
    studentsUserNames,
    teachersUserNames,
    code,
  }: DTOBodyType<typeof CourseDTO.createCourse>) {
    const parentCourse = await this.getCourse(parentCourseId);
    if (!parentCourse) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    const course = new Course();
    course.name = parentCourse.name;
    course.image = parentCourse.image;
    course.isBase = false;
    course.code = code;
    course.description = description ? description : parentCourse.description;
    course.academicDuration = academicDuration
      ? academicDuration
      : parentCourse.academicDuration;
    if (startDate) course.startDate = startDate;
    if (endDate) course.endDate = endDate;
    if (academicYear) course.academicYear = academicYear;
    if (prerequisiteCourseIds)
      course.prerequisiteCourses = Promise.resolve(
        await this.getCourses(prerequisiteCourseIds),
      );
    if (prerequisiteCourseGroupIds)
      course.prerequisiteCourseGroups = await CourseGroupModel.getCourseGroups(
        prerequisiteCourseGroupIds,
      );
    if (studentsUserNames) {
      let students = await UserModel.getUsersByUsernames(studentsUserNames);
      students = students.filter((student) => student.type === "STUDENT");
      course.students = Promise.resolve(students);
    }
    if (teachersUserNames) {
      let teachers = await UserModel.getUsersByUsernames(teachersUserNames);
      teachers = teachers.filter((teacher) => teacher.type === "TEACHER");
      course.teachers = Promise.resolve(teachers);
    }
    try {
      await PostGresDataSource.getRepository(Course).save(course);
      await CourseMaterialService.createCourseMaterial({
        courseId: course.id,
        sections: [
          {
            title: "Lectures",
            description: "Lectures for the course",
          },
          {
            title: "Exams",
            description: "Exams for the course",
          },
          {
            title: "Sheets",
            description: "Sheets for the course",
          },
          {
            title: "Projects",
            description: "Projects for the course",
          },
          {
            title: "Module information",
            description: "Information about the modules in the course",
          },
          {
            title: "Attendance",
            description: "Attendance for the course",
          },
          {
            title: "Announcements",
            description: "Announcements for the course",
          },
          {
            title: "Grades",
            description: "Grades for the course",
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }

  public static async deleteCourse(courseId: string) {
    await PostGresDataSource.getRepository(Course).delete({ id: courseId });
  }

  public static async deleteCourses(courseIds: string[]) {
    await PostGresDataSource.getRepository(Course).delete({
      id: In(courseIds),
    });
  }

  public static async getCourse(courseId: string) {
    return await PostGresDataSource.getRepository(Course).findOne({
      where: { id: courseId },
    });
  }

  public static async getCourses(courseIds: string[]) {
    return await PostGresDataSource.getRepository(Course).find({
      where: { id: In(courseIds) },
    });
  }

  public static async saveCourse(course: Course) {
    await PostGresDataSource.getRepository(Course).save(course);
  }

  public static async saveCourses(courses: Course[]) {
    await PostGresDataSource.getRepository(Course).save(courses);
  }

  public static async searchCourseByName(name: string, isBase: boolean) {
    const where: any = { name: ILike(`%${name}%`) };

    if (isBase) {
      where.isBase = true;
    }

    return await PostGresDataSource.getRepository(Course).find({
      where,
    });
  }
}
