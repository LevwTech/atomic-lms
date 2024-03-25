import CourseMaterialModel from '../models/course-material/course-material.model';
import {
  AttachmentSchema,
  CourseSectionSchema,
} from '../models/course-material/course-material.schema';
import { DTOBodyType } from '../../../common/types/DTOType';
import { CourseMaterialDTO } from '@atomic/dto';
import { API_ERROR } from '../../../common/helpers/throwApiError';
import { API_MESSAGES } from '../../../common/helpers/apiMessages';

class CourseMaterialService {
  public static async createCourseMaterial(
    createMaterialDTO: DTOBodyType<
      typeof CourseMaterialDTO.createCourseMaterial
    >
  ) {
    const sections = createMaterialDTO.sections
      ? createMaterialDTO.sections.map((section) => {
          return {
            title: section.title,
            content: [],
          };
        })
      : [];
    return CourseMaterialModel.createCourseMaterial(
      createMaterialDTO.courseId,
      sections
    );
  }

  public static async getCourseMaterial(courseId: string) {
    const material = await CourseMaterialModel.getCourseMaterial(courseId);

    if (!material) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    return material;
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
    // ? should I delete the attachment from the storage as well?
    // let's leave it for now until we decide if soft delete is the way to go

    return CourseMaterialModel.removeAttachment(
      courseId,
      sectionId,
      attachmentId
    );
  }
}

export default CourseMaterialService;
