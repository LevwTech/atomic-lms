import bcrypt from "bcrypt";
import { AuthDTO } from "@atomic/dto";
import jwt from "jsonwebtoken";

import UserModel from "../models/user/user.model";
import { DTOBodyType } from "../../../common/types/DTOType";
import { API_ERROR } from "../../../common/helpers/throwApiError";
import { API_MESSAGES } from "../../../common/helpers/apiMessages";
import {
  PERMISSIONS_TYPE,
  USER_TYPES,
  getPermissionsArrayForUserType,
} from "@atomic/common";
import { tokenBodyType } from "../../../common/types/jwtPayload";
import PermissionsGroupModel from "../models/permissionGroup/permissionsGroup.model";

class AuthSerivce {
  public static async createUser(user: DTOBodyType<typeof AuthDTO.createUser>) {
    const { password, ...userInfo } = user;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await UserModel.createUser({
      ...userInfo,
      password: hashedPassword,
    });
  }

  // edit user
  public static async editUser(username: string, data: any) {
    await UserModel.editUser(username, data);
  }

  public static async getSingleUser(username: string) {
    return await UserModel.getUserByUsername(username);
  }

  public static async getAllUsers(
    page: number,
    limit: number,
    type?: USER_TYPES,
  ) {
    return await UserModel.getAllUsers(page, limit, type);
  }

  static async signTokens(username: string, email: string, type: USER_TYPES) {
    const accessToken = jwt.sign(
      { email, username, type },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: process.env.NODE_ENV === "development" ? "90d" : "15m" },
    );
    const refreshToken = jwt.sign(
      { email, username, type },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "90d" },
    );

    return { accessToken, refreshToken };
  }

  public static async refreshToken(refreshToken: string) {
    const jwtPayload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as tokenBodyType;

    const user = await UserModel.getUserByUsername(jwtPayload.username);

    if (!user) {
      throw new API_ERROR(API_MESSAGES.INVALID_CREDENTIALS);
    }

    if (!user.refreshTokens.includes(refreshToken.split(".")[2])) {
      throw new API_ERROR(API_MESSAGES.INVALID_CREDENTIALS);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.signTokens(user.username, user.email, user.type);

    await UserModel.updateUserRefreshToken(
      user.username,
      newRefreshToken.split(".")[2],
      refreshToken.split(".")[2],
    );

    return { accessToken, refreshToken: newRefreshToken };
  }

  public static async login(username: string, password: string) {
    const user = await UserModel.getUserByUsername(username);

    if (!user) {
      throw new API_ERROR(API_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new API_ERROR(API_MESSAGES.INVALID_CREDENTIALS);
    }

    const { accessToken, refreshToken } = await this.signTokens(
      user.username,
      user.email,
      user.type,
    );

    await UserModel.updateUserRefreshToken(
      username,
      refreshToken.split(".")[2],
    );

    return { accessToken, refreshToken };
  }

  public static async logout(refreshToken: string) {
    const jwtPayload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as tokenBodyType;

    const user = await UserModel.getUserByUsername(jwtPayload.username);

    if (!user) {
      throw new API_ERROR(API_MESSAGES.INVALID_CREDENTIALS);
    }

    await UserModel.removeUserRefreshToken(
      user.username,
      refreshToken.split(".")[2],
    );
  }

  public static async deleteUser(username: string) {
    await UserModel.deleteUser(username);
  }

  public static async addPermissions(
    usernames: string[],
    permissions: string[],
  ) {
    const users = await UserModel.getUsersByUsernames(usernames);

    users.forEach((user) => {
      const userPermissions = getPermissionsArrayForUserType(user.type);

      permissions.forEach((permission) => {
        if (!userPermissions.includes(permission)) {
          throw new API_ERROR(API_MESSAGES.INVALID_PERMISSION);
        }
      });
      user.permissions.push(...(permissions as PERMISSIONS_TYPE<USER_TYPES>[]));
    });

    await UserModel.saveUsers(users);
  }

  public static async removePermissions(
    usernames: string[],
    permissions: string[],
  ) {
    const users = await UserModel.getUsersByUsernames(usernames);

    users.forEach((user) => {
      user.permissions = user.permissions.filter(
        (permission) => !permissions.includes(permission as string),
      );
    });

    await UserModel.saveUsers(users);
  }

  public static async createPermissionsGroup(
    permissionsGroup: DTOBodyType<typeof AuthDTO.createPermissionsGroup>,
  ) {
    await PermissionsGroupModel.createPermissionsGroup(permissionsGroup);
  }

  public static async deletePermissionsGroup(
    permissionGroup: DTOBodyType<typeof AuthDTO.deletePermissionsGroup>,
  ) {
    if (permissionGroup.id) {
      await PermissionsGroupModel.deletePermissionsGroup({
        groupId: permissionGroup.id,
      });
    }

    if (permissionGroup.name) {
      await PermissionsGroupModel.deletePermissionsGroup({
        groupName: permissionGroup.name,
      });
    }
  }

  public static async editPermissionsGroup(
    permissionsGroup: DTOBodyType<typeof AuthDTO.editPermissionsGroup>,
  ) {
    const group = await PermissionsGroupModel.getGroupPermission({
      groupId: permissionsGroup.id,
    });

    if (!group) {
      throw new API_ERROR(API_MESSAGES.DOESNT_EXIST);
    }

    if (permissionsGroup.name) {
      group.name = permissionsGroup.name;
    }

    if (permissionsGroup.addPermissions) {
      const permissions = getPermissionsArrayForUserType(group.type);
      permissionsGroup.addPermissions.forEach((permission) => {
        if (!permissions.includes(permission as string)) {
          throw new API_ERROR(API_MESSAGES.INVALID_PERMISSION);
        }
      });
      group.permissions.push(...permissionsGroup.addPermissions);
    }

    if (permissionsGroup.removePermissions) {
      group.permissions = group.permissions.filter(
        (permission) =>
          !permissionsGroup.removePermissions?.includes(permission),
      );
    }

    if (permissionsGroup.addUsers) {
      const users = await UserModel.getUsersByUsernames(
        permissionsGroup.addUsers,
      );
      users.forEach((user) => {
        user.permissionGroups.push(group);
      });
      await UserModel.saveUsers(users);
    }

    if (permissionsGroup.removeUsers) {
      const users = await UserModel.getUsersByUsernames(
        permissionsGroup.removeUsers,
      );
      users.forEach((user) => {
        user.permissionGroups = user.permissionGroups.filter(
          (permissionGroup) => permissionGroup.id !== group.id,
        );
      });
      await UserModel.saveUsers(users);
    }

    await PermissionsGroupModel.savePermissionsGroup(group);
  }

  public static async searchUsers(search: string, type?: USER_TYPES) {
    return await UserModel.searchUsers(search, type);
  }
}

export default AuthSerivce;
