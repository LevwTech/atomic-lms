import express from 'express';
import authMiddleware from '../../common/middlewares/authMiddleware';
import CourseMaterialController from './controllers/course-material';
import validationMiddleware from '../../common/middlewares/validationMiddleware';
import { CourseMaterialDTO } from '@atomic/dto';

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
  '/:courseId/add-section',
  authMiddleware(),
  validationMiddleware(CourseMaterialDTO.addSection),
  CourseMaterialController.addSection
);

export default materialsRouter;
