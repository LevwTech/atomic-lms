import { Request, Response } from 'express';
import CourseMaterialService from '../services/course-material';
import { ValidatedRequest } from '../../../common/middlewares/validationMiddleware';
import { CourseMaterialDTO } from '@atomic/dto';

class CourseMaterialController {
  public static async getCourseMaterial(
    req: ValidatedRequest<typeof CourseMaterialDTO.getCourseMaterial>,
    res: Response
  ) {
    const { courseId } = req.params;
    const courseMaterial =
      await CourseMaterialService.getCourseMaterial(courseId);

    res.json(courseMaterial);
  }

  public static async createCourseMaterial(
    req: ValidatedRequest<typeof CourseMaterialDTO.createCourseMaterial>,
    res: Response
  ) {
    const { courseId } = req.body;
    const courseMaterial =
      await CourseMaterialService.createCourseMaterial(courseId);

    res.json(courseMaterial);
  }

  public static async addSection(
    req: ValidatedRequest<typeof CourseMaterialDTO.addSection>,
    res: Response
  ) {}
}

export default CourseMaterialController;
