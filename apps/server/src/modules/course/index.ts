import express from "express";
import { CourseDTO } from "@atomic/dto";

import CourseController from "./controllers/course";
import validationMiddleware from "../../common/middlewares/validationMiddleware";
import authMiddleware from "../../common/middlewares/authMiddleware";
import { USER_TYPES } from "@atomic/common";
import {
  ADMIN_PERMISSIONS,
  TEACHER_PERMISSIONS,
  STUDENT_PERMISSIONS,
} from "@atomic/common";

const courseRouter = express.Router();

courseRouter.get(
  "/courses",
  authMiddleware({
    [USER_TYPES.ADMIN]: [],
  }),
  CourseController.getAllCourses,
);

courseRouter.get(
  "/courses-group",
  authMiddleware({
    [USER_TYPES.ADMIN]: [],
  }),
  CourseController.getAllCourseGroups,
);

courseRouter.post(
  "/course",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.CREATE_COURSE],
  }),
  validationMiddleware(CourseDTO.createCourse),
  CourseController.createCourse,
);

courseRouter.post(
  "/base-course",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.CREATE_BASE_COURSE],
  }),
  validationMiddleware(CourseDTO.createBaseCourse),
  CourseController.createBaseCourse,
);

courseRouter.post(
  "/course-group",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.CREATE_COURSE_GROUP],
  }),
  validationMiddleware(CourseDTO.createCourseGroup),
  CourseController.createCourseGroup,
);

courseRouter.delete(
  "/course",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.DELETE_COURSE],
  }),
  validationMiddleware(CourseDTO.deleteCourses),
  CourseController.deleteCourses,
);

courseRouter.put(
  "/course",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.EDIT_COURSE],
  }),
  validationMiddleware(CourseDTO.editCourse),
  CourseController.editCourse,
);

courseRouter.delete(
  "/course-group",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.DELETE_COURSE_GROUP],
  }),
  validationMiddleware(CourseDTO.deleteCourseGroups),
  CourseController.deleteCourseGroups,
);

courseRouter.put(
  "/course-group",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.EDIT_COURSE_GROUP],
  }),
  validationMiddleware(CourseDTO.editCourseGroup),
  CourseController.editCourseGroup,
);

courseRouter.put(
  "/edit-prerequisite-course",
  authMiddleware({
    [USER_TYPES.ADMIN]: [
      ADMIN_PERMISSIONS.ADD_PREREQUISITE_COURSES_TO_COURSE,
      ADMIN_PERMISSIONS.REMOVE_PREREQUISITE_COURSES_TO_COURSE,
    ],
  }),
  validationMiddleware(CourseDTO.editCoursePrerequisiteCourses),
  CourseController.editCoursePrerequisiteCourses,
);

courseRouter.put(
  "/edit-prerequisite-course-group",
  authMiddleware({
    [USER_TYPES.ADMIN]: [
      ADMIN_PERMISSIONS.ADD_PREREQUISITE_COURSE_GROUPS_TO_COURSE,
      ADMIN_PERMISSIONS.REMOVE_PREREQUISITE_COURSE_GROUPS_TO_COURSE,
    ],
  }),
  validationMiddleware(CourseDTO.editCoursePrerequisiteCourseGroups),
  CourseController.editCoursePrerequisiteCourseGroups,
);

courseRouter.post(
  "/enroll",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.ENROLL_USERS_IN_COURSE],
  }),
  validationMiddleware(CourseDTO.enrollUsersInCourse),
  CourseController.enrollUsersInCourse,
);

courseRouter.post(
  "/add-teacher",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.ADD_TEACHERS_IN_COURSE],
  }),
  validationMiddleware(CourseDTO.addTeachersInCourse),
  CourseController.addTeachersInCourse,
);

courseRouter.get(
  "/course",
  authMiddleware({
    [USER_TYPES.STUDENT]: [],
  }),
  validationMiddleware(CourseDTO.getStudentCourses),
  CourseController.getStudentCourses,
);

courseRouter.get(
  "/course-teacher",
  authMiddleware({
    [USER_TYPES.TEACHER]: [],
  }),
  CourseController.getUserTeachingCourses,
);

courseRouter.get(
  "/courses/search",
  authMiddleware({
    [USER_TYPES.ADMIN]: [],
  }),
  validationMiddleware(CourseDTO.searchCourseByName),
  CourseController.searchCourseByName,
);

courseRouter.get(
  "/course-group/search",
  authMiddleware({
    [USER_TYPES.ADMIN]: [],
  }),
  validationMiddleware(CourseDTO.searchCourseGroupByName),
  CourseController.searchCourseGroupByName,
);

export default courseRouter;
