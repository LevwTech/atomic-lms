import express from 'express';
import { AuthDTO } from '@atomic/dto';

import AuthController from './controllers/auth';
import validationMiddleware from '../../common/middlewares/validationMiddleware';
import authMiddleware from '../../common/middlewares/authMiddleware';
import { USER_TYPES } from '@atomic/common';
import ADMIN_PERMISSIONS from '@atomic/common/permissions/admin';

const usersRouter = express.Router();

usersRouter.post(
  '/login',
  validationMiddleware(AuthDTO.login),
  AuthController.login
);

usersRouter.post(
  '/create',
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.CREATE_USER],
  }),
  validationMiddleware(AuthDTO.createUser),
  AuthController.createUser
);

usersRouter.get('/refresh-token', AuthController.refreshToken);

export default usersRouter;
