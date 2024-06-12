import express from "express";
import { AuthDTO } from "@atomic/dto";

import AuthController from "./controllers/auth";
import validationMiddleware from "../../common/middlewares/validationMiddleware";
import authMiddleware from "../../common/middlewares/authMiddleware";
import { USER_TYPES, ADMIN_PERMISSIONS } from "@atomic/common";

const usersRouter = express.Router();

usersRouter.post(
  "/login",
  validationMiddleware(AuthDTO.login),
  AuthController.login,
);

usersRouter.post(
  "/create",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.CREATE_USER],
  }),
  validationMiddleware(AuthDTO.createUser),
  AuthController.createUser,
);

// get all users
usersRouter.get(
  "/get-all",
  authMiddleware({
    [USER_TYPES.ADMIN]: [],
  }),
  AuthController.getAllUsers,
);

// takes refresh token and returns new access token and refresh token
usersRouter.get("/refresh-token", AuthController.refreshToken);

// takes refresh token and removes it from user
usersRouter.get("/logout", AuthController.logout);

usersRouter.post(
  "/delete-user",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.DELETE_USER],
  }),
  validationMiddleware(AuthDTO.deleteUser),
  AuthController.deleteUser,
);

// change user password
// change user info
// forgot password

usersRouter.post(
  "/add-permissions",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.ADD_PERMISSIONS_TO_USER],
  }),
  validationMiddleware(AuthDTO.addPermissions),
  AuthController.addPermissions,
);

usersRouter.post(
  "/remove-permissions",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.REMOVE_PERMISSIONS_FROM_USER],
  }),
  validationMiddleware(AuthDTO.addPermissions),
  AuthController.removePermissions,
);

usersRouter.post(
  "/create-permissions-group",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.CREATE_PERMISSIONS_GROUP],
  }),
  validationMiddleware(AuthDTO.createPermissionsGroup),
  AuthController.createPermissionsGroup,
);

usersRouter.post(
  "/delete-permissions-group",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.DELETE_PERMISSIONS_GROUP],
  }),
  validationMiddleware(AuthDTO.deletePermissionsGroup),
  AuthController.deletePermissionsGroup,
);

usersRouter.post(
  "/edit-permissions-group",
  authMiddleware({
    [USER_TYPES.ADMIN]: [ADMIN_PERMISSIONS.EDIT_PERMISSIONS_GROUP],
  }),
  validationMiddleware(AuthDTO.editPermissionsGroup),
  AuthController.editPermissionsGroup,
);

usersRouter.get(
  "/search",
  authMiddleware({
    [USER_TYPES.ADMIN]: [],
  }),
  validationMiddleware(AuthDTO.searchUsers),
  AuthController.searchUsers,
);

export default usersRouter;
