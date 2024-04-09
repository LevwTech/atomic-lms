import { QueryFailedError, In } from 'typeorm';
import { PostGresDataSource } from '../../../../app';
import { CourseGroup } from './courseGroup.entity';
import { API_ERROR } from '../../../../common/helpers/throwApiError';
import { API_MESSAGES } from '../../../../common/helpers/apiMessages';
import CourseModel from '../course/course.model';

export class CourseGroupModel {
  
  public static async getCourseGroup({
    groupId,
    groupName,
  }:
    | { groupId?: string; groupName: string }
    | { groupName?: string; groupId: string }) {
    return await PostGresDataSource.getRepository(CourseGroup).findOne({
      where: { id: groupId, name: groupName },
    });
  }

  public static async getCourseGroups(courseGroupIds: string[]) {
    let query = {
      where: { id: In(courseGroupIds) },
    }
    return await PostGresDataSource.getRepository(CourseGroup).find(query);
  }

  public static async saveCourseGroup(group: CourseGroup) {
    await PostGresDataSource.getRepository(CourseGroup).save(group);
  }

  public static async saveCourseGroups(groups: CourseGroup[]) {
    await PostGresDataSource.getRepository(CourseGroup).save(groups);
  }

  public static async createCourseGroup({ name, courseIds }: { name: string, courseIds?: string[]}) {
    const group = new CourseGroup();
    group.name = name;
    if (courseIds && courseIds.length) group.courses =  await CourseModel.getCourses(courseIds);
    try {
      await this.saveCourseGroup(group);
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.message.includes('duplicate key')
      ) {
        throw new API_ERROR(API_MESSAGES.GROUP_ALREADY_EXISTS);
      }
    }
  }

  public static async deleteCourseGroup({
    groupId,
    groupName,
  }:
    | { groupId?: string; groupName: string }
    | { groupName?: string; groupId: string }) {
    let query = {};
    if (groupId) {
      query = { id: groupId };
    } else if (groupName) {
      query = { name: groupName };
    }
    await PostGresDataSource.getRepository(CourseGroup).delete(query);
  }

  public static async deleteCourseGroups({
    groupIds,
    groupNames,
  }:
    | { groupIds?: string[]; groupNames: string[] }
    | { groupNames?: string[]; groupIds: string[] }) {
    let query = {};
    if (groupIds && groupIds.length) {
      query = {
        where: { id: In(groupIds) },
      }
    } else if (groupNames && groupNames.length) {
      query = {
        where: { id: In(groupNames) },
      }
    }
    await PostGresDataSource.getRepository(CourseGroup).delete(query);
  }

}

export default CourseGroupModel;
