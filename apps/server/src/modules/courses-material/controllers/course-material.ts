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

    // ! check if student is enrolled in the course or teacher is the owner of the course

    const courseMaterial =
      await CourseMaterialService.getCourseMaterial(courseId);

    res.json(courseMaterial);
  }

  public static async createCourseMaterial(
    req: ValidatedRequest<typeof CourseMaterialDTO.createCourseMaterial>,
    res: Response
  ) {
    const courseMaterial = await CourseMaterialService.createCourseMaterial(
      req.body
    );

    res.json(courseMaterial);
  }

  public static async getSection(
    req: ValidatedRequest<typeof CourseMaterialDTO.getSection>,
    res: Response
  ) {
    const { courseId, sectionId } = req.params;

    // ! Check if student is enrolled in the course or teacher is the owner of the course

    const section = await CourseMaterialService.getSection(courseId, sectionId);

    res.json(section);
  }

  public static async addSection(
    req: ValidatedRequest<typeof CourseMaterialDTO.addSection>,
    res: Response
  ) {
    const { courseId } = req.params;
    const { section } = req.body;

    // ! Check if teacher is the owner of the course

    await CourseMaterialService.addSection(courseId, {
      ...section,
      content: [],
    });

    return res.status(200).json({ message: 'Section added' });
  }

  public static async editSection(
    req: ValidatedRequest<typeof CourseMaterialDTO.editSection>,
    res: Response
  ) {
    const { courseId, sectionId } = req.params;
    const { section } = req.body;

    const { title, description } = section;

    // ! Check if teacher is the owner of the course

    await CourseMaterialService.editSection(
      courseId,
      sectionId,
      title,
      description
    );

    res.status(200).json({ message: 'Section edited' });
  }

  public static async removeSection(
    req: ValidatedRequest<typeof CourseMaterialDTO.removeSection>,
    res: Response
  ) {
    const { courseId, sectionId } = req.params;

    // ! Check if teacher is the owner of the course

    await CourseMaterialService.removeSection(courseId, sectionId);

    res.status(200).json({ message: 'Section removed' });
  }

  public static async addAttachment(
    req: ValidatedRequest<typeof CourseMaterialDTO.addAttachment>,
    res: Response
  ) {
    // ! Check if teacher is the owner of the course

    const { courseId, sectionId } = req.params;
    const { title } = req.body;
    const attachment = req.file as Express.MulterS3.File;

    if (!attachment) {
      return res.status(400).json({ message: 'No attachment provided' });
    }

    await CourseMaterialService.addAttachment(courseId, sectionId, {
      title: title || attachment.originalname,
      fileName: attachment.originalname,
      key: attachment.key,
      url: attachment.location,
      contentType: attachment.mimetype,
    });

    return res.status(200).json({ message: 'Attachment added' });
  }

  public static async editAttachment(
    req: ValidatedRequest<typeof CourseMaterialDTO.editAttachment>,
    res: Response
  ) {
    const { courseId, sectionId, attachmentId } = req.params;
    const { title } = req.body;

    // ! Check if teacher is the owner of the course

    await CourseMaterialService.editAttachment(
      courseId,
      sectionId,
      attachmentId,
      title
    );

    res.status(200).json({ message: 'Attachment edited' });
  }

  public static async removeAttachment(
    req: ValidatedRequest<typeof CourseMaterialDTO.removeAttachment>,
    res: Response
  ) {
    const { courseId, sectionId, attachmentId } = req.params;

    // ! Check if teacher is the owner of the course

    await CourseMaterialService.removeAttachment(
      courseId,
      sectionId,
      attachmentId
    );

    res.status(200).json({ message: 'Attachment removed' });
  }
}

export default CourseMaterialController;
