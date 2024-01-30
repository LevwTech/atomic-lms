import { QueryFailedError } from 'typeorm';
import { PostGresDataSource } from '../../../../app';
import { PermissionsGroup } from './permissionsGroup.entitiy';
import { API_ERROR } from '../../../../common/helpers/throwApiError';
import { API_MESSAGES } from '../../../../common/helpers/apiMessages';
import { PERMISSIONS_TYPE, USER_TYPES } from '@atomic/common';

class PermissionsGroupModel {
  public static async getGroupPermission({
    groupId,
    groupName,
  }:
    | { groupId?: string; groupName: string }
    | { groupName?: string; groupId: string }) {
    return await PostGresDataSource.getRepository(PermissionsGroup).findOne({
      where: { id: groupId, name: groupName },
    });
  }

  public static async savePermissionsGroup(group: PermissionsGroup) {
    await PostGresDataSource.getRepository(PermissionsGroup).save(group);
  }

  public static async createPermissionsGroup({
    name,
    permissions,
    type,
  }: {
    name: string;
    permissions: PERMISSIONS_TYPE<USER_TYPES>[];
    type: USER_TYPES;
  }) {
    const group = new PermissionsGroup();
    group.name = name;
    group.permissions = permissions;
    group.type = type;
    try {
      await PostGresDataSource.getRepository(PermissionsGroup).save(group);
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.message.includes('duplicate key')
      ) {
        throw new API_ERROR(API_MESSAGES.GROUP_ALREADY_EXISTS);
      }
    }
  }

  public static async deletePermissionsGroup({
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
    await PostGresDataSource.getRepository(PermissionsGroup).delete(query);
  }
}

export default PermissionsGroupModel;
