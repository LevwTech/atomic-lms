import CourseMaterialModel from "../models/course-material/course-material.model";
import {
  AttachmentSchema,
  CourseSectionSchema,
  FlashCardSchema,
  MCQQuestionSchema,
  TFQuestionSchema,
} from "../models/course-material/course-material.schema";
import { DTOBodyType } from "../../../common/types/DTOType";
import { CourseMaterialDTO } from "@atomic/dto";
import { API_ERROR } from "../../../common/helpers/throwApiError";
import { API_MESSAGES } from "../../../common/helpers/apiMessages";
import AIService from "../../AI/services/ai";
import mongoose from "mongoose";

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
    const material = await CourseMaterialModel.getCourseMaterial(courseId);

    if (!material) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    return material;
  }

  public static async getCourseMaterialWithContent(courseId: string) {
    const material =
      await CourseMaterialModel.getCourseMaterialWithContent(courseId);

    if (!material) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    return material;
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
    title: string | undefined,
    attachment: Express.MulterS3.File,
  ) {
    const attachmentId = await CourseMaterialModel.addAttachment(
      courseId,
      sectionId,
      {
        _id: new mongoose.Types.ObjectId().toHexString(),
        title: title || attachment.originalname,
        fileName: attachment.originalname,
        key: attachment.key,
        url: attachment.location,
        contentType: attachment.mimetype,
        doesHaveChatBot: false,
        docIds: [],
        isSummarized: false,
        summary: "",
        doesHaveFlashCards: false,
        flashCards: [],
        doesHaveMCQs: false,
        mcqQuestions: [],
        doesHaveTFs: false,
        tfQuestions: [],
      },
    );

    AIService.ingestFile(attachment, courseId, sectionId, attachmentId, title);
  }

  public static async addAttachmentDocIds(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    docIds: string[],
  ) {
    return CourseMaterialModel.addAttachmentDocIds(
      courseId,
      sectionId,
      attachmentId,
      docIds,
    );
  }

  public static async addAttachmentSummary(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    summary: string,
  ) {
    return CourseMaterialModel.addAttachmentSummary(
      courseId,
      sectionId,
      attachmentId,
      summary,
    );
  }

  public static async addAttachmentFlashCards(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    flashCards: FlashCardSchema[],
  ) {
    return CourseMaterialModel.addAttachmentFlashCards(
      courseId,
      sectionId,
      attachmentId,
      flashCards,
    );
  }

  public static async getAttachmentDocIds(
    courseId: string,
    sectionId: string,
    attachmentId: string,
  ) {
    const docIds = await CourseMaterialModel.getAttachmentDocIds(
      courseId,
      sectionId,
      attachmentId,
    );

    if (!docIds) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    return docIds;
  }

  public static async getAttachmentFlashCards(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    questionId?: string,
  ) {
    const flashCards = await CourseMaterialModel.getAttachmentFlashCards(
      courseId,
      sectionId,
      attachmentId,
      questionId,
    );

    if (!flashCards) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    return flashCards;
  }

  public static async addAttachmentMCQs(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    mcqQuestions: MCQQuestionSchema[],
  ) {
    return CourseMaterialModel.addAttachmentMCQs(
      courseId,
      sectionId,
      attachmentId,
      mcqQuestions,
    );
  }

  public static async addAttachmentTFs(
    courseId: string,
    sectionId: string,
    attachmentId: string,
    tfQuestions: TFQuestionSchema[],
  ) {
    return CourseMaterialModel.addAttachmentTFs(
      courseId,
      sectionId,
      attachmentId,
      tfQuestions,
    );
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
