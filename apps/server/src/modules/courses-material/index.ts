import express from 'express';
import authMiddleware from '../../common/middlewares/authMiddleware';
import CourseMaterialController from './controllers/course-material';
import validationMiddleware from '../../common/middlewares/validationMiddleware';
import { CourseMaterialDTO } from '@atomic/dto';
import { USER_TYPES } from '@atomic/common';
import ADMIN_PERMISSIONS from '@atomic/common/permissions/admin';
import uploadMiddleware from '../../common/middlewares/fileUploadMiddleware';

const materialsRouter = express.Router();

materialsRouter.post(
  '/create',
  authMiddleware(),
  validationMiddleware(CourseMaterialDTO.createCourseMaterial),
  CourseMaterialController.createCourseMaterial
);

materialsRouter.get(
  '/:courseId',
  authMiddleware(),
  validationMiddleware(CourseMaterialDTO.getCourseMaterial),
  CourseMaterialController.getCourseMaterial
);

materialsRouter.post(
  '/:courseId/section',
  authMiddleware({
    [USER_TYPES.TEACHER]: [],
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.EDIT_COURSE_MATERIALS],
  }),
  validationMiddleware(CourseMaterialDTO.addSection),
  CourseMaterialController.addSection
);

materialsRouter.delete(
  '/:courseId/section',
  authMiddleware({
    [USER_TYPES.TEACHER]: [],
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.EDIT_COURSE_MATERIALS],
  }),
  validationMiddleware(CourseMaterialDTO.removeSection),
  CourseMaterialController.removeSection
);

materialsRouter.post(
  '/:courseId/section/:sectionId/attachment',
  authMiddleware({
    [USER_TYPES.TEACHER]: [],
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.EDIT_COURSE_MATERIALS],
  }),
  uploadMiddleware.single('attachment'),
  validationMiddleware(CourseMaterialDTO.addAttachment),
  CourseMaterialController.addAttachment
);

materialsRouter.delete(
  '/:courseId/section/:sectionId/attachment',
  authMiddleware({
    [USER_TYPES.TEACHER]: [],
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.EDIT_COURSE_MATERIALS],
  }),
  validationMiddleware(CourseMaterialDTO.removeAttachment),
  CourseMaterialController.removeAttachment
);

export default materialsRouter;
