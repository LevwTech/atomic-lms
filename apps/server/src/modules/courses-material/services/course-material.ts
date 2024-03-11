import CourseMaterialModel from '../models/course-material/course-material.model';
import {
  AttachmentSchema,
  CourseSectionSchema,
} from '../models/course-material/course-material.schema';

class CourseMaterialService {
  public static async createCourseMaterial(courseId: string) {
    return CourseMaterialModel.createCourseMaterial(courseId);
  }

  public static async getCourseMaterial(courseId: string) {
    return CourseMaterialModel.getCourseMaterial(courseId);
  }

  public static async addSection(
    courseId: string,
    section: CourseSectionSchema
  ) {
    return CourseMaterialModel.addSection(courseId, section);
  }

  public static async removeSection(courseId: string, sectionId: string) {
    return CourseMaterialModel.removeSection(courseId, sectionId);
  }

  public static async addAttachment(
    courseId: string,
    sectionId: string,
    attachment: AttachmentSchema
  ) {
    return CourseMaterialModel.addAttachment(courseId, sectionId, attachment);
  }

  public static async removeAttachment(
    courseId: string,
    sectionId: string,
    attachmentId: string
  ) {
    return CourseMaterialModel.removeAttachment(
      courseId,
      sectionId,
      attachmentId
    );
  }
}

export default CourseMaterialService;
