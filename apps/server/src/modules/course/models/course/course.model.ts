import { In } from 'typeorm';
import { Course } from './course.entity';
import { CourseDTO } from '@atomic/dto';
import { PostGresDataSource } from '../../../../app';
import { API_ERROR } from '../../../../common/helpers/throwApiError';
import { API_MESSAGES } from '../../../../common/helpers/apiMessages';
import { DTOBodyType } from '../../../../common/types/DTOType';
import CourseGroupModel from '../courseGroup/courseGroup.model';

export default class CourseModel {

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
        prerequisiteCourseIds
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
        if (prerequisiteCourseIds) course.prerequisiteCourses = await this.getCourses(prerequisiteCourseIds);
        if (prerequisiteCourseGroupIds) course.prerequisiteCourseGroups = await CourseGroupModel.getCourseGroups(prerequisiteCourseGroupIds);
        try {
          await PostGresDataSource.getRepository(Course).save(course);
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
        prerequisiteCourseGroupIds
      }: DTOBodyType<typeof CourseDTO.createCourse>) {
        const parentCourse = await this.getCourse(parentCourseId); 
        if (!parentCourse) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        const course = new Course();
        course.name = parentCourse.name;
        course.code = parentCourse.code;
        course.image = parentCourse.image;
        course.isBase = false;
        course.description = description ? description : parentCourse.description;
        course.academicDuration = academicDuration ? academicDuration : parentCourse.academicDuration;
        if (startDate) course.startDate = startDate;
        if (endDate) course.endDate = endDate;
        if (academicYear) course.academicYear = academicYear;
        if (prerequisiteCourseIds) course.prerequisiteCourses = await this.getCourses(prerequisiteCourseIds);
        if (prerequisiteCourseGroupIds) course.prerequisiteCourseGroups = await CourseGroupModel.getCourseGroups(prerequisiteCourseGroupIds);
        try {
          await PostGresDataSource.getRepository(Course).save(course);
        } catch (err) {
          console.log(err);
        }
      }

      public static async deleteCourse(courseId: string) {
        await PostGresDataSource.getRepository(Course).delete({ id: courseId });
      }

      public static async deleteCourses(courseIds: string[]) {
        await PostGresDataSource.getRepository(Course).delete({ id: In(courseIds) });
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

}