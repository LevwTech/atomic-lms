import { ReturnModelType, getModelForClass } from "@typegoose/typegoose";
import CourseMaterialSchema, {
  AttachmentSchema,
  CourseSectionSchema,
  FlashCardSchema,
  MCQQuestionSchema,
  TFQuestionSchema,
} from "./course-material.schema";
import { API_ERROR } from "../../../../common/helpers/throwApiError";
import { API_MESSAGES } from "../../../../common/helpers/apiMessages";

class CourseMaterialMethods extends CourseMaterialSchema {
  public static async createCourseMaterial(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sections: CourseSectionSchema[],
  ) {
    try {
      const newCourse = new this({ courseId, sections: sections });
      await newCourse.save();
      return newCourse;
    } catch (err) {
      throw new API_ERROR(API_MESSAGES.ALREADY_EXISTS);
    }
  }

  public static async getCourseMaterial(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
  ) {
    return this.findOne({ courseId }).select("-sections.content");
  }

  public static async getCourseMaterialWithContent(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
  ) {
    return this.findOne({ courseId });
  }

  public static async addSection(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    section: CourseSectionSchema,
  ) {
    return this.updateOne({ courseId }, { $push: { sections: section } });
  }

  public static async getSection(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
  ) {
    const course = await this.findOne(
      { courseId },
      { sections: { $elemMatch: { _id: sectionId } } },
    );

    return course ? course.sections[0] : null;
  }

  public static async editSection(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    title?: string,
    description?: string,
  ) {
    const update: Record<string, string> = {};

    if (title) {
      update["sections.$.title"] = title;
    }

    if (description) {
      update["sections.$.description"] = description;
    }

    return this.updateOne(
      { courseId, "sections._id": sectionId },
      { $set: update },
    );
  }

  public static async removeSection(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
  ) {
    return this.updateOne(
      { courseId },
      { $pull: { sections: { _id: sectionId } } },
    );
  }

  public static async addAttachment(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachment: AttachmentSchema,
  ) {
    await this.updateOne(
      { courseId, "sections._id": sectionId },
      { $push: { "sections.$.content": attachment } },
    );

    return attachment._id;
  }

  public static async addAttachmentDocIds(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string,
    docIds: string[],
  ) {
    return this.updateOne(
      {
        courseId,
      },
      {
        $set: {
          "sections.$[section].content.$[content].docIds": docIds,
          "sections.$[section].content.$[content].doesHaveChatBot": true,
        },
      },
      {
        arrayFilters: [
          { "section._id": sectionId },
          { "content._id": attachmentId },
        ],
      },
    );
  }

  public static async getAttachmentDocIds(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string,
  ) {
    const course = await this.findOne({ courseId });

    if (!course) {
      return null;
    }

    const section = course.sections.find(
      (s) => (s as any)._id.toString() === sectionId,
    );

    if (!section) {
      return null;
    }

    const attachment = section.content.find(
      (a) => a._id.toString() === attachmentId,
    );

    if (!attachment) {
      return null;
    }

    return attachment.docIds;
  }

  public static async addAttachmentSummary(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string,
    summary: string,
  ) {
    return this.updateOne(
      {
        courseId,
      },
      {
        $set: {
          "sections.$[section].content.$[content].summary": summary,
          "sections.$[section].content.$[content].isSummarized": true,
        },
      },
      {
        arrayFilters: [
          { "section._id": sectionId },
          { "content._id": attachmentId },
        ],
      },
    );
  }

  public static async addAttachmentFlashCards(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string,
    flashCards: FlashCardSchema[],
  ) {
    return this.updateOne(
      {
        courseId,
      },
      {
        $set: {
          "sections.$[section].content.$[content].flashCards": flashCards,
          "sections.$[section].content.$[content].doesHaveFlashCards": true,
        },
      },
      {
        arrayFilters: [
          { "section._id": sectionId },
          { "content._id": attachmentId },
        ],
      },
    );
  }

  public static async getAttachmentFlashCards(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string,
    questionId?: string,
  ) {
    const course = await this.findOne({ courseId });

    if (!course) {
      return null;
    }

    const section = course.sections.find(
      (s) => (s as any)._id.toString() === sectionId,
    );

    if (!section) {
      return null;
    }

    const attachment = section.content.find(
      (a) => a._id.toString() === attachmentId,
    );

    if (!attachment) {
      return null;
    }

    if (!questionId) {
      return attachment.flashCards;
    }

    const flashCard = attachment.flashCards.find(
      (f) => f._id!.toString() === questionId,
    );

    return flashCard;
  }

  public static async addAttachmentMCQs(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string,
    mcqQuestions: MCQQuestionSchema[],
  ) {
    return this.updateOne(
      {
        courseId,
      },
      {
        $set: {
          "sections.$[section].content.$[content].mcqQuestions": mcqQuestions,
          "sections.$[section].content.$[content].doesHaveMCQs": true,
        },
      },
      {
        arrayFilters: [
          { "section._id": sectionId },
          { "content._id": attachmentId },
        ],
      },
    );
  }

  public static async addAttachmentTFs(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string,
    tfQuestions: TFQuestionSchema[],
  ) {
    return this.updateOne(
      {
        courseId,
      },
      {
        $set: {
          "sections.$[section].content.$[content].tfQuestions": tfQuestions,
          "sections.$[section].content.$[content].doesHaveTFs": true,
        },
      },
      {
        arrayFilters: [
          { "section._id": sectionId },
          { "content._id": attachmentId },
        ],
      },
    );
  }

  public static async editAttachment(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string,
    title: string,
  ) {
    return this.updateOne(
      {
        courseId,
      },
      {
        $set: {
          "sections.$[section].content.$[content].title": title,
        },
      },
      {
        arrayFilters: [
          { "section._id": sectionId },
          { "content._id": attachmentId },
        ],
      },
    );
  }

  public static async removeAttachment(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string,
  ) {
    return this.updateOne(
      { courseId, "sections._id": sectionId },
      { $pull: { "sections.$.content": { _id: attachmentId } } },
    );
  }
}

const CourseMaterialModel = getModelForClass(CourseMaterialMethods, {
  options: { customName: "CourseMaterial" },
});

export default CourseMaterialModel;
