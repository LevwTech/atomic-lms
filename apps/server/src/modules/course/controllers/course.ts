import { Request, Response } from 'express';
import { CourseDTO } from '@atomic/dto';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import CourseService from '../services/course';
import { ValidatedRequest } from '../../../common/middlewares/validationMiddleware';
import getUserFromRequest from '../../../common/helpers/getUserFromRequest';
import { studentCoursesOptions } from '@atomic/common/constants'

export default class CourseController {
    public static async createCourse(
        req: ValidatedRequest<typeof CourseDTO.createCourse>,
        res: Response
    ) {
        const courseData = req.body;

        await CourseService.createCourse(courseData);

        return res
            .status(StatusCodes.CREATED)
            .json({ message: getReasonPhrase(StatusCodes.CREATED) });
    }

    public static async createBaseCourse(
        req: ValidatedRequest<typeof CourseDTO.createBaseCourse>,
        res: Response
    ) {
        const courseData = req.body;

        await CourseService.createBaseCourse(courseData);

        return res
            .status(StatusCodes.CREATED)
            .json({ message: getReasonPhrase(StatusCodes.CREATED) });
    }

    public static async createCourseGroup(
        req: ValidatedRequest<typeof CourseDTO.createCourseGroup>,
        res: Response
    ) {
        const courseGroupData = req.body;

        await CourseService.createCourseGroup(courseGroupData);

        return res
            .status(StatusCodes.CREATED)
            .json({ message: getReasonPhrase(StatusCodes.CREATED) });
    }

    public static async deleteCourses(
        req: ValidatedRequest<typeof CourseDTO.deleteCourses>,
        res: Response
    ) {
        const { ids } = req.body;

        await CourseService.deleteCourses(ids);

        return res
            .status(StatusCodes.OK)
            .json({ message: getReasonPhrase(StatusCodes.OK) });
    }

    public static async deleteCourseGroups(
        req: ValidatedRequest<typeof CourseDTO.deleteCourseGroups>,
        res: Response
    ) {
        const courseGroups = req.body;

        await CourseService.deleteCourseGroups(courseGroups);

        return res
            .status(StatusCodes.OK)
            .json({ message: getReasonPhrase(StatusCodes.OK) });
    }

    public static async enrollUsersInCourse(
        req: ValidatedRequest<typeof CourseDTO.enrollUsersInCourse>,
        res: Response
    ) {
        const { usernames, courseIds } = req.body;

        await CourseService.enrollUsersInCourse({usernames, courseIds});

        return res
            .status(StatusCodes.OK)
            .json({ message: getReasonPhrase(StatusCodes.OK) });
    }

    public static async addTeachersInCourse(
        req: ValidatedRequest<typeof CourseDTO.addTeachersInCourse>,
        res: Response
    ) {
        const { usernames, courseIds } = req.body;

        await CourseService.addTeachersInCourse({usernames, courseIds});

        return res
            .status(StatusCodes.OK)
            .json({ message: getReasonPhrase(StatusCodes.OK) });
    }

    public static async editCourse(
        req: ValidatedRequest<typeof CourseDTO.editCourse>,
        res: Response
    ) {
        const courseData = req.body;

        await CourseService.editCourse(courseData);

        return res
            .status(StatusCodes.OK)
            .json({ message: getReasonPhrase(StatusCodes.OK) });
    }

    public static async editCourseGroup(
        req: ValidatedRequest<typeof CourseDTO.editCourseGroup>,
        res: Response
    ) {
        const courseGroupData = req.body;

        await CourseService.editCourseGroup(courseGroupData);

        return res
            .status(StatusCodes.OK)
            .json({ message: getReasonPhrase(StatusCodes.OK) });
    }

    public static async editCoursePrerequisiteCourses(
        req: ValidatedRequest<typeof CourseDTO.editCoursePrerequisiteCourses>,
        res: Response
    ) {
        const courseData = req.body;

        await CourseService.editCoursePrerequisiteCourses(courseData);

        return res
            .status(StatusCodes.OK)
            .json({ message: getReasonPhrase(StatusCodes.OK) });
    }

    public static async editCoursePrerequisiteCourseGroups(
        req: ValidatedRequest<typeof CourseDTO.editCoursePrerequisiteCourseGroups>,
        res: Response
    ) {
        const courseData = req.body;

        await CourseService.editCoursePrerequisiteCourseGroups(courseData);

        return res
            .status(StatusCodes.OK)
            .json({ message: getReasonPhrase(StatusCodes.OK) });
    }

    public static async getStudentCourses(
        req: ValidatedRequest<typeof CourseDTO.getStudentCourses>,
        res: Response
    ) {
        const user = getUserFromRequest(req);
        const { option } = req.query;
        switch (option) {
            case studentCoursesOptions.ENROLLED:
                const courses = await CourseService.getUserCourses(user.username);
                courses.forEach(course => (course as any).enrolled = true);
                return res
                    .status(StatusCodes.OK)
                    .json({ courses });
            case studentCoursesOptions.COMPLETED:
                const completedCourses = await CourseService.getUserCompletedCourses(user.username);
                completedCourses.forEach(course => (course as any).completed = true);
                return res
                    .status(StatusCodes.OK)
                    .json({ courses: completedCourses });
            case studentCoursesOptions.ALL:
                const { enrolled, completed } = await CourseService.getAllUserCourses(user.username);
                enrolled.forEach(course => (course as any).enrolled = true);
                completed.forEach(course => (course as any).completed = true);
                return res
                    .status(StatusCodes.OK)
                    .json({ enrolled, completed });
            default:
                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json({ message: 'Invalid option' });
        }
    }

    public static async getUserTeachingCourses(
        req: Request,
        res: Response
    ) {
        const user = getUserFromRequest(req);
        const courses = await CourseService.getUserTeachingCourses(user.username);
        return res
            .status(StatusCodes.OK)
            .json({ courses });
    }

}