import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { PERMISSIONS_TYPE, USER_TYPES } from '@atomic/common';

import { tokenBodyType } from '../types/jwtPayload';
import UserModel from '../../modules/users/models/user/user.model';
import { User } from '../../modules/users/models/user/user.entitiy';
import getAllUserPermissions from '../helpers/getAllUserPermissions';

export interface AuthRequest extends Request<{}, any, {}, {}> {
  user: User & { allPermissions: PERMISSIONS_TYPE<USER_TYPES>[] };
}

type AuthMiddlewareParam = {
  [K in USER_TYPES]?: PERMISSIONS_TYPE<K>[];
};

export default function authMiddleware(
  requiredPermissions?: AuthMiddlewareParam
) {
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

      const userGrantedPermissions = getAllUserPermissions(user);

      if (!requiredPermissions) {
        (req as AuthRequest).user = {
          ...user,
          allPermissions: userGrantedPermissions,
        };

        return next();
      }

      if (!Object.keys(requiredPermissions).includes(user.type)) {
        throw new Error();
      }

      const requiredPermissionsToGrantAccess = requiredPermissions[
        user.type
      ] as PERMISSIONS_TYPE<typeof user.type>[];

      for (const permission of requiredPermissionsToGrantAccess) {
        if (!userGrantedPermissions.includes(permission)) {
          throw new Error();
        }
      }

      (req as AuthRequest).user = {
        ...user,
        allPermissions: userGrantedPermissions,
      };

      return next();
    } catch (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
    }
  };
}
