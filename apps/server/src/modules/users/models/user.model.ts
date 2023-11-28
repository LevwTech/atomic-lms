import { QueryFailedError } from 'typeorm';
import { User } from './user.entitiy';
import { AuthDTO } from '@atomic/dto';

import { PostGresDataSource } from '../../../app';
import { API_ERROR } from '../../../common/helpers/throwApiError';
import { API_MESSAGES } from '../../../common/helpers/apiMessages';
import { DTOBodyType } from '../../../common/types/DTOType';

class UserModel {
  public static async createUser({
    firstName,
    lastName,
    type,
    username,
    password,
    email,
  }: DTOBodyType<typeof AuthDTO.createUser>) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.type = type;
    user.username = username;
    user.password = password;
    user.email = email;

    try {
      await PostGresDataSource.getRepository(User).save(user);
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.message.includes('duplicate key')
      ) {
        if (err.driverError.detail.includes('username')) {
          throw new API_ERROR(API_MESSAGES.USERNAME_ALREADY_EXISTS);
        } else {
          throw new API_ERROR(API_MESSAGES.EMAIL_ALREADY_EXISTS);
        }
      }
    }
  }

  public static async getUserByUsername(username: string) {
    return await PostGresDataSource.getRepository(User).findOne({
      where: { username },
    });
  }

  public static async updateUserRefreshToken(
    username: string,
    refreshToken: string,
    oldToken?: string
  ) {
    const user = await PostGresDataSource.getRepository(User).findOne({
      where: { username },
    });

    if (!oldToken) {
      user!.refreshTokens.push(refreshToken);
    } else {
      user!.refreshTokens = user!.refreshTokens.filter(
        (token) => token !== oldToken
      );
      user!.refreshTokens.push(refreshToken);
    }

    await PostGresDataSource.getRepository(User).save(user!);
  }
}

export default UserModel;
