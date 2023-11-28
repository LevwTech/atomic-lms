import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { USER_TYPES } from '@atomic/common';

import { tokenBodyType } from '../types/jwtPayload';
import UserModel from '../../modules/users/models/user.model';
import { User } from '../../modules/users/models/user.entitiy';

export interface AuthRequest extends Request<{}, any, {}, {}> {
  user: User;
}

export default function authMiddleware(userTypes?: USER_TYPES[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
    }

    try {
      const tokenPayload = jwt.verify(
        authToken.split(' ')[1],
        process.env.ACCESS_TOKEN_SECRET!
      ) as tokenBodyType;

      const user = await UserModel.getUserByUsername(tokenPayload.username);

      if (!user) {
        throw new Error();
      }

      if (!userTypes?.includes(user.type)) {
        throw new Error();
      }

      // pass user data to request handler
      (req as AuthRequest).user = user;

      return next();
    } catch (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
    }
  };
}
