import express from 'express';
import { AuthDTO } from '@atomic/dto';

import AuthController from './controllers/auth';
import validationMiddleware from '../../common/middlewares/validationMiddleware';
import authMiddleware from '../../common/middlewares/authMiddleware';
import { USER_TYPES } from '@atomic/common';

const usersRouter = express.Router();

usersRouter.post(
  '/login',
  validationMiddleware(AuthDTO.login),
  AuthController.login
);

usersRouter.post(
  '/create',
  authMiddleware([USER_TYPES.ADMIN]),
  validationMiddleware(AuthDTO.createUser),
  AuthController.createUser
);

usersRouter.get('/refresh-token', AuthController.refreshToken);

export default usersRouter;
