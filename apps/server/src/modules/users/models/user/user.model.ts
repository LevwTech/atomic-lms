import { In, QueryFailedError, ILike } from "typeorm";
import { User } from "./user.entitiy";
import { AuthDTO } from "@atomic/dto";

import { PostGresDataSource } from "../../../../app";
import { API_ERROR } from "../../../../common/helpers/throwApiError";
import { API_MESSAGES } from "../../../../common/helpers/apiMessages";
import { DTOBodyType } from "../../../../common/types/DTOType";
import { PERMISSIONS_TYPE, USER_TYPES } from "@atomic/common";
import { PermissionsGroup } from "../permissionGroup/permissionsGroup.entitiy";

class UserModel {
  public static async createUser({
    firstName,
    lastName,
    type,
    username,
    password,
    email,
    permissions,
    prmissionsGroupIds,
  }: DTOBodyType<typeof AuthDTO.createUser>) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.type = type;
    user.username = username;
    user.password = password;
    user.email = email;
    user.permissions = permissions as PERMISSIONS_TYPE<USER_TYPES>[];

    if (prmissionsGroupIds) {
      const groups = prmissionsGroupIds.map((id) => {
        const group = new PermissionsGroup();
        group.id = id;
        return group;
      });

      user.permissionGroups = groups;
    }

    try {
      await PostGresDataSource.getRepository(User).save(user);
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.message.includes("duplicate key")
      ) {
        if (err.driverError.detail.includes("username")) {
          throw new API_ERROR(API_MESSAGES.USERNAME_ALREADY_EXISTS);
        } else {
          throw new API_ERROR(API_MESSAGES.EMAIL_ALREADY_EXISTS);
        }
      }
      console.log(err);
    }
  }

  // edit user
  public static async editUser(username: string, data: any) {
    await PostGresDataSource.getRepository(User).update(
      { username },
      {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        type: data.type,
        permissions: data.permissions,
        password: data.password,
      },
    );
  }

  public static async getAllUsers(
    page: number,
    limit: number,
    type?: USER_TYPES,
  ) {
    const where = type ? { type } : {};
    const [users, totalCount] = await PostGresDataSource.getRepository(
      User,
    ).findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { firstName: "ASC" },
      where,
    });
    return { users, totalPages: Math.ceil(totalCount / limit) };
  }

  public static async deleteUser(username: string) {
    await PostGresDataSource.getRepository(User).delete({ username });
  }

  public static async getUserByUsername(username: string) {
    return await PostGresDataSource.getRepository(User).findOne({
      where: { username },
    });
  }

  public static async getUsersByUsernames(usernames: string[]) {
    return await PostGresDataSource.getRepository(User).find({
      where: { username: In(usernames) },
    });
  }

  public static async saveUser(user: User) {
    await PostGresDataSource.getRepository(User).save(user);
  }

  public static async saveUsers(users: User[]) {
    await PostGresDataSource.getRepository(User).save(users);
  }

  public static async updateUserRefreshToken(
    username: string,
    refreshToken: string,
    oldToken?: string,
  ) {
    const user = await PostGresDataSource.getRepository(User).findOne({
      where: { username },
    });

    if (!oldToken) {
      user!.refreshTokens.push(refreshToken);
    } else {
      user!.refreshTokens = user!.refreshTokens.filter(
        (token) => token !== oldToken,
      );
      user!.refreshTokens.push(refreshToken);
    }

    await PostGresDataSource.getRepository(User).save(user!);
  }

  public static async removeUserRefreshToken(username: string, token: string) {
    const user = await PostGresDataSource.getRepository(User).findOne({
      where: { username },
    });

    user!.refreshTokens = user!.refreshTokens.filter(
      (refreshToken) => refreshToken !== token,
    );

    await PostGresDataSource.getRepository(User).save(user!);
  }

  public static async addPermissionsToUser(
    username: string,
    permissions: PERMISSIONS_TYPE<USER_TYPES>[],
  ) {
    const user = await PostGresDataSource.getRepository(User).findOne({
      where: { username },
    });

    user!.permissions.push(...permissions);

    await PostGresDataSource.getRepository(User).save(user!);
  }

  public static async removePermissionsFromUser(
    username: string,
    permissions: PERMISSIONS_TYPE<USER_TYPES>[],
  ) {
    const user = await PostGresDataSource.getRepository(User).findOne({
      where: { username },
    });

    user!.permissions = user!.permissions.filter(
      (permission) => !permissions.includes(permission),
    );

    await PostGresDataSource.getRepository(User).save(user!);
  }

  public static async addUserToPermissionsGroup(
    username: string,
    groupId: string,
  ) {
    const user = await PostGresDataSource.getRepository(User).findOne({
      where: { username },
    });

    const group = new PermissionsGroup();
    group.id = groupId;

    user!.permissionGroups.push(group);

    await PostGresDataSource.getRepository(User).save(user!);
  }

  public static async removeUserFromPermissionsGroup(
    username: string,
    groupId: string,
  ) {
    const user = await PostGresDataSource.getRepository(User).findOne({
      where: { username },
    });

    user!.permissionGroups = user!.permissionGroups.filter(
      (group) => group.id !== groupId,
    );

    await PostGresDataSource.getRepository(User).save(user!);
  }

  public static async searchUsers(searchTerm: string, type?: USER_TYPES) {
    const where: any = [
      {
        firstName: ILike(`%${searchTerm}%`),
        lastName: ILike(`%${searchTerm}%`),
      },
      { email: ILike(`%${searchTerm}%`) },
      { username: ILike(`%${searchTerm}%`) },
    ];

    if (type) {
      where.forEach((obj: any) => {
        obj.type = type;
      });
    }
    return await PostGresDataSource.getRepository(User).find({
      where,
      select: ["username", "firstName", "lastName", "email", "type", "id"],
    });
  }
}

export default UserModel;
