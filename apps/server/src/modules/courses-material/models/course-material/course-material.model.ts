import { ReturnModelType, getModelForClass } from '@typegoose/typegoose';
import CourseMaterialSchema, {
  AttachmentSchema,
  CourseSectionSchema,
} from './course-material.schema';
import { API_ERROR } from '../../../../common/helpers/throwApiError';
import { API_MESSAGES } from '../../../../common/helpers/apiMessages';

class CourseMaterialMethods extends CourseMaterialSchema {
  public static async createCourseMaterial(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string
  ) {
    try {
      const newCourse = new this({ courseId, sections: [] });
      await newCourse.save();
      return newCourse;
    } catch (err) {
      throw new API_ERROR(API_MESSAGES.ALREADY_EXISTS);
    }
  }

  public static async getCourseMaterial(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string
  ) {
    return this.findOne({ courseId });
  }

  public static async addSection(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    section: CourseSectionSchema
  ) {
    return this.updateOne({ courseId }, { $push: { sections: section } });
  }

  public static async removeSection(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string
  ) {
    return this.updateOne(
      { courseId },
      { $pull: { sections: { _id: sectionId } } }
    );
  }

  public static async addAttachment(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachment: AttachmentSchema
  ) {
    return this.updateOne(
      { courseId, 'sections._id': sectionId },
      { $push: { 'sections.$.content': attachment } }
    );
  }

  public static async removeAttachment(
    this: ReturnModelType<typeof CourseMaterialSchema>,
    courseId: string,
    sectionId: string,
    attachmentId: string
  ) {
    return this.updateOne(
      { courseId, 'sections._id': sectionId },
      { $pull: { 'sections.$.content': { _id: attachmentId } } }
    );
  }
}

const CourseMaterialModel = getModelForClass(CourseMaterialMethods, {
  options: { customName: 'CourseMaterial' },
});

export default CourseMaterialModel;
