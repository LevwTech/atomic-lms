import CourseMaterialModel from "../models/course-material/course-material.model";
import {
  AttachmentSchema,
  CourseSectionSchema,
} from "../models/course-material/course-material.schema";
import { DTOBodyType } from "../../../common/types/DTOType";
import { CourseMaterialDTO } from "@atomic/dto";
import { API_ERROR } from "../../../common/helpers/throwApiError";
import { API_MESSAGES } from "../../../common/helpers/apiMessages";
import CourseService from "../../../modules/course/services/course";

class CourseMaterialService {
  public static async createCourseMaterial(
    createMaterialDTO: DTOBodyType<
      typeof CourseMaterialDTO.createCourseMaterial
    >,
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
      sections,
    );
  }

  public static async getCourseMaterial(courseId: string) {
    const course = await CourseService.getCourse(courseId);
    if (!course) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }
    const material = await CourseMaterialModel.getCourseMaterial(courseId);

    if (!material) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    return {
      course,
      material,
    };
  }

  public static async getSection(courseId: string, sectionId: string) {
    const section = await CourseMaterialModel.getSection(courseId, sectionId);

    if (!section) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    return section;
  }

  public static async addSection(
    courseId: string,
    section: CourseSectionSchema,
  ) {
    return CourseMaterialModel.addSection(courseId, section);
  }

  public static async editSection(
    courseId: string,
    sectionId: string,
    title?: string,
    description?: string,
  ) {
    return CourseMaterialModel.editSection(
      courseId,
      sectionId,
      title,
      description,
    );
  }

  public static async removeSection(courseId: string, sectionId: string) {
    return CourseMaterialModel.removeSection(courseId, sectionId);
  }

  public static async addAttachment(
    courseId: string,
    sectionId: string,
    attachment: AttachmentSchema,
  ) {
    return CourseMaterialModel.addAttachment(courseId, sectionId, attachment);
  }

  public static async getAttachment(
    courseId: string,
    sectionId: string,
    attachmentId: string,
  ) {
    const attachment = await CourseMaterialModel.getAttachment(
      courseId,
      sectionId,
      attachmentId,
    );

    if (!attachment) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    return attachment;
  }

  public static async editAttachment(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    title: string,
  ) {
    return CourseMaterialModel.editAttachment(
      courseId,
      sectionId,
      attachmentId,
      title,
    );
  }

  public static async removeAttachment(
    courseId: string,
    sectionId: string,
    attachmentId: string,
  ) {
    // ? should I delete the attachment from the storage as well?
    // let's leave it for now until we decide if soft delete is the way to go

    return CourseMaterialModel.removeAttachment(
      courseId,
      sectionId,
      attachmentId,
    );
  }
}

export default CourseMaterialService;
