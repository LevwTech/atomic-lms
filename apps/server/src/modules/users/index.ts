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

// change user password
// change user info
// forgot password
// delete user

// change user permissions
// add user/s to permissions group
// remove user/s from permissions group
// create permissions group
// change group permissions
// delete permissions group (remove all users from group first)

export default usersRouter;
