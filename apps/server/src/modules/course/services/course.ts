import { CourseDTO } from "@atomic/dto";
import CourseModel from "../models/course/course.model";
import UserModel from "../../users/models/user/user.model";
import CourseGroupModel from "../models/courseGroup/courseGroup.model";
import { DTOBodyType } from '../../../common/types/DTOType';
import { API_ERROR } from '../../../common/helpers/throwApiError';
import { API_MESSAGES } from '../../../common/helpers/apiMessages';

export default class CourseService {

    // TODO: handle course creation with course groups or prerequisiteCourseGroups
    public static async createBaseCourse(course: DTOBodyType<typeof CourseDTO.createBaseCourse>) {
        await CourseModel.createBaseCourse(course);
    }

    public static async createCourse(course: DTOBodyType<typeof CourseDTO.createCourse>) {
        await CourseModel.createCourse(course);
    }

    public static async createCourseGroup(courseGroup: DTOBodyType<typeof CourseDTO.createCourseGroup>) {
        await CourseGroupModel.createCourseGroup(courseGroup);
    }

    public static async deleteCourseGroup(courseGroup: DTOBodyType<typeof CourseDTO.deleteCourseGroup>) {
        if (courseGroup.id) await CourseGroupModel.deleteCourseGroup({ groupId: courseGroup.id});
        if (courseGroup.name) await CourseGroupModel.deleteCourseGroup({ groupName: courseGroup.name});
    }

    public static async deleteCourseGroups(courseGroup: DTOBodyType<typeof CourseDTO.deleteCourseGroups>) {
        if (courseGroup.ids) await CourseGroupModel.deleteCourseGroups({ groupIds: courseGroup.ids});
        if (courseGroup.names) await CourseGroupModel.deleteCourseGroups({ groupNames: courseGroup.names});
    }

    public static async getUserCourses(username: string) {
        const user = await UserModel.getUserByUsername(username);
        if (!user) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        return user.coursesEnrolled;
    }

    public static async getUserCompletedCourses(username: string) {
        const user = await UserModel.getUserByUsername(username);
        if (!user) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        return user.coursesCompleted;
    }

    public static async getAllUserCourses(username: string) {
        const user = await UserModel.getUserByUsername(username);
        if (!user) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        return {
        enrolled: user.coursesEnrolled,
        completed: user.coursesCompleted
        }
    }

    public static async getUserTeachingCourses(username: string) {
        const user = await UserModel.getUserByUsername(username);
        if (!user) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        return user.coursesTeaching;
    }

    public static async enrollUsersInCourse({ usernames, courseIds }: DTOBodyType<typeof CourseDTO.enrollUsersInCourse>) {
        let users = await UserModel.getUsersByUsernames(usernames);
        // TODO: replace with includes once multiple user types are implemented
        users = users.filter(user => user.type === 'STUDENT');
        const courses = await CourseModel.getCourses(courseIds);
        users.forEach(user => {
            const userCourseIds = user.coursesEnrolled.map(course => course.id);
            const coursesToBeEnrolledIn = courses.filter(course => !userCourseIds.includes(course.id));
            user.coursesEnrolled.push(...coursesToBeEnrolledIn);
        })
        await UserModel.saveUsers(users);
    }

    public static async addTeachersInCourse({ usernames, courseIds }: DTOBodyType<typeof CourseDTO.addTeachersInCourse>) {
        let users = await UserModel.getUsersByUsernames(usernames);
        // TODO: replace with includes once multiple user types are implemented
        users = users.filter(user => user.type === 'TEACHER');
        const courses = await CourseModel.getCourses(courseIds);
        users.forEach(user => {
            const userCourseIds = user.coursesTeaching.map(course => course.id);
            const coursesToBeEnrolledIn = courses.filter(course => !userCourseIds.includes(course.id));
            user.coursesEnrolled.push(...coursesToBeEnrolledIn);
        })
        await UserModel.saveUsers(users);
    }

    public static async isTeacherInCourse(username: string, courseId: string) {
        const user = await UserModel.getUserByUsername(username);
        if (!user) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        const courses = user.coursesTeaching;
        return courses.some(course => course.id === courseId);
    }

    public static async isStudentInCourse(username: string, courseId: string) {
        const user = await UserModel.getUserByUsername(username);
        if (!user) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        const courses = [...user.coursesEnrolled, ...user.coursesCompleted]
        return courses.some(course => course.id === courseId);
    }

    public static async isCourseExists(courseId: string) {
        const course = await CourseModel.getCourse(courseId);
        return !!course;
    }

    public static async getChildCourses(courseId: string) {
        const course = await CourseModel.getCourse(courseId);
        if (!course) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        if (!course.isBase) throw new API_ERROR(API_MESSAGES.COURSE_IS_NOT_BASE);
        return await course.childCourses;
    }

    public static async editCourse(courseEdits: DTOBodyType<typeof CourseDTO.editCourse>) {
        const course  = await CourseModel.getCourse(courseEdits.id);
        if (!course) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        if (courseEdits.name) {
            course.name = courseEdits.name
            const childCourses = await course.childCourses;
            if (childCourses && childCourses.length)
                childCourses.forEach(childCourse => {   
                    if (courseEdits.name)
                        childCourse.name = courseEdits.name
                });
            await CourseModel.saveCourses(childCourses);
        }
        if (courseEdits.code) {
            course.code = courseEdits.code
            const childCourses = await course.childCourses;
            if (childCourses && childCourses.length)
                childCourses.forEach(childCourse => {   
                    if (courseEdits.code)
                        childCourse.code = courseEdits.code
                });
            await CourseModel.saveCourses(childCourses);
        }
        if (courseEdits.image) {
            course.image = courseEdits.image
            const childCourses = await course.childCourses;
            if (childCourses && childCourses.length)
                childCourses.forEach(childCourse => {   
                    if (courseEdits.image)
                        childCourse.image = courseEdits.image
                });
            await CourseModel.saveCourses(childCourses);
        }
        if (courseEdits.description) course.description = courseEdits.description;
        if (courseEdits.startDate) course.startDate = courseEdits.startDate;
        if (courseEdits.endDate) course.endDate = courseEdits.endDate;
        if (courseEdits.academicDuration) course.academicDuration = courseEdits.academicDuration;
        if (courseEdits.academicYear) course.academicYear = courseEdits.academicYear;
        await CourseModel.saveCourse(course);
    }

    public static async editCourseGroup(courseGroupEdits: DTOBodyType<typeof CourseDTO.editCourseGroup>) {
        const courseGroup  = await CourseGroupModel.getCourseGroup({ groupId: courseGroupEdits.id});
        if (!courseGroup) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        const groupCourseCourses = await courseGroup.courses;
        if (courseGroupEdits.name) courseGroup.name = courseGroupEdits.name;
        if (courseGroupEdits.courseIdsToAdd && courseGroupEdits.courseIdsToAdd.length) {
            const coursesToAdd = await CourseModel.getCourses(courseGroupEdits.courseIdsToAdd);
            groupCourseCourses.push(...coursesToAdd);
        }
        if (courseGroupEdits.courseIdsToRemove && courseGroupEdits.courseIdsToRemove.length) {
            courseGroup.courses = Promise.resolve(groupCourseCourses.filter(course => !courseGroupEdits.courseIdsToRemove?.includes(course.id)));
        }
        await CourseGroupModel.saveCourseGroup(courseGroup);
    }

    public static async editCoursePrerequisiteCourses(courseEdits: DTOBodyType<typeof CourseDTO.editCoursePrerequisiteCourses>) {
        const course  = await CourseModel.getCourse(courseEdits.id);
        if (!course) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        let prerequisiteCourses = await course.prerequisiteCourses;
        if (!course) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        if (courseEdits.prerequisiteCourseIdsToAdd && courseEdits.prerequisiteCourseIdsToAdd.length) {
            const prerequisiteCoursesToAdd = await CourseModel.getCourses(courseEdits.prerequisiteCourseIdsToAdd);
            prerequisiteCourses.push(...prerequisiteCoursesToAdd)
            course.prerequisiteCourses = Promise.resolve(prerequisiteCourses);
        }
        if (courseEdits.prerequisiteCourseIdsToRemove && courseEdits.prerequisiteCourseIdsToRemove.length) {
            prerequisiteCourses = prerequisiteCourses.filter(course => !courseEdits.prerequisiteCourseIdsToRemove?.includes(course.id));
            course.prerequisiteCourses = Promise.resolve(prerequisiteCourses);
        }
        await CourseModel.saveCourse(course);
    }

    public static async editCoursePrerequisiteCourseGroups(courseEdits: DTOBodyType<typeof CourseDTO.editCoursePrerequisiteCourseGroups>) {
        const course  = await CourseModel.getCourse(courseEdits.id);
        if (!course) throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
        if (courseEdits.prerequisiteCourseGroupIdsToAdd && courseEdits.prerequisiteCourseGroupIdsToAdd.length) {
            const prerequisiteCourseGroupsToAdd = await CourseGroupModel.getCourseGroups(courseEdits.prerequisiteCourseGroupIdsToAdd);
            course.prerequisiteCourseGroups.push(...prerequisiteCourseGroupsToAdd)
        }
        if (courseEdits.prerequisiteCourseGroupIdsToRemove && courseEdits.prerequisiteCourseGroupIdsToRemove.length) {
            course.prerequisiteCourseGroups = course.prerequisiteCourseGroups.filter(course => !courseEdits.prerequisiteCourseGroupIdsToRemove?.includes(course.id));
        }
        await CourseModel.saveCourse(course);
    }

    public static async deleteCourse(courseId: string) {
        await CourseModel.deleteCourse(courseId);
    }

    public static async deleteCourses(courseIds: string[]) {
        await CourseModel.deleteCourses(courseIds);
    }

}