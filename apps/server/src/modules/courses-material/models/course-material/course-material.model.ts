import { ReturnModelType, getModelForClass } from "@typegoose/typegoose";
import CourseMaterialSchema, {
  AttachmentSchema,
  CourseSectionSchema,
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
    return this.updateOne(
      { courseId, "sections._id": sectionId },
      { $push: { "sections.$.content": attachment } },
    );
  }

  public static async getAttachment(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string,
  ) {
    const section = await CourseMaterialModel.getSection(courseId, sectionId);

    if (!section) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    const attachment = section.content.find(
      (content: any) => content._id.toString() === attachmentId,
    );

    return attachment;
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
