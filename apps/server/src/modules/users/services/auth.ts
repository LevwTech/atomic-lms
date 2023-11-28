import bcrypt from 'bcrypt';
import { AuthDTO } from '@atomic/dto';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user.model';
import { DTOBodyType } from '../../../common/types/DTOType';
import { API_ERROR } from '../../../common/helpers/throwApiError';
import { API_MESSAGES } from '../../../common/helpers/apiMessages';
import { USER_TYPES } from '@atomic/common';
import { tokenBodyType } from '../../../common/types/jwtPayload';

class AuthSerivce {
  public static async createUser(user: DTOBodyType<typeof AuthDTO.createUser>) {
    const { password, ...userInfo } = user;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await UserModel.createUser({
      ...userInfo,
      password: hashedPassword,
    });
  }

  static async signTokens(username: string, email: string, type: USER_TYPES) {
    const accessToken = jwt.sign(
      { email, username, type },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { email, username, type },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '90d' }
    );

    return { accessToken, refreshToken };
  }

  public static async refreshToken(refreshToken: string) {
    const jwtPayload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as tokenBodyType;

    const user = await UserModel.getUserByUsername(jwtPayload.username);

    if (!user) {
      throw new API_ERROR(API_MESSAGES.INVALID_CREDENTIALS);
    }

    if (!user.refreshTokens.includes(refreshToken.split('.')[2])) {
      throw new API_ERROR(API_MESSAGES.INVALID_CREDENTIALS);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.signTokens(user.username, user.email, user.type);

    await UserModel.updateUserRefreshToken(
      user.username,
      newRefreshToken.split('.')[2],
      refreshToken.split('.')[2]
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
      user.type
    );

    await UserModel.updateUserRefreshToken(
      username,
      refreshToken.split('.')[2]
    );

    return { accessToken, refreshToken };
  }
}

export default AuthSerivce;
