import { Request, Response } from "express";
import { AuthDTO } from "@atomic/dto";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import AuthSerivce from "../services/auth";
import { ValidatedRequest } from "../../../common/middlewares/validationMiddleware";
import { USER_TYPES } from "@atomic/common";

class AuthController {
  public static async login(
    req: ValidatedRequest<typeof AuthDTO.login>,
    res: Response,
  ) {
    const { username, password } = req.body;

    const tokens = await AuthSerivce.login(username, password);

    return res.status(StatusCodes.OK).json(tokens);
  }

  public static async getAllUsers(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const type = req.query.type as USER_TYPES | undefined;

    const users = await AuthSerivce.getAllUsers(page, limit, type);
    return res.status(StatusCodes.OK).json(users);
  }

  public static async createUser(
    req: ValidatedRequest<typeof AuthDTO.createUser>,
    res: Response,
  ) {
    const userData = req.body;

    await AuthSerivce.createUser(userData);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: getReasonPhrase(StatusCodes.CREATED) });
  }

  public static async refreshToken(req: Request, res: Response) {
    const authToken = req.headers.authorization;

    const tokens = await AuthSerivce.refreshToken(authToken!.split(" ")[1]);

    return res.status(StatusCodes.OK).json(tokens);
  }

  public static async logout(req: Request, res: Response) {
    const authToken = req.headers.authorization;

    await AuthSerivce.logout(authToken!.split(" ")[1]);

    return res
      .status(StatusCodes.OK)
      .json({ message: getReasonPhrase(StatusCodes.OK) });
  }

  public static async deleteUser(
    req: ValidatedRequest<typeof AuthDTO.deleteUser>,
    res: Response,
  ) {
    const { username } = req.body;

    await AuthSerivce.deleteUser(username);

    return res
      .status(StatusCodes.OK)
      .json({ message: getReasonPhrase(StatusCodes.OK) });
  }

  public static async addPermissions(
    req: ValidatedRequest<typeof AuthDTO.addPermissions>,
    res: Response,
  ) {
    const { usernames, permissions } = req.body;

    await AuthSerivce.addPermissions(usernames, permissions);

    return res
      .status(StatusCodes.OK)
      .json({ message: getReasonPhrase(StatusCodes.OK) });
  }

  public static async removePermissions(
    req: ValidatedRequest<typeof AuthDTO.addPermissions>,
    res: Response,
  ) {
    const { usernames, permissions } = req.body;

    await AuthSerivce.removePermissions(usernames, permissions);

    return res
      .status(StatusCodes.OK)
      .json({ message: getReasonPhrase(StatusCodes.OK) });
  }

  public static async createPermissionsGroup(
    req: ValidatedRequest<typeof AuthDTO.createPermissionsGroup>,
    res: Response,
  ) {
    const group = req.body;

    await AuthSerivce.createPermissionsGroup(group);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: getReasonPhrase(StatusCodes.CREATED) });
  }

  public static async deletePermissionsGroup(
    req: ValidatedRequest<typeof AuthDTO.deletePermissionsGroup>,
    res: Response,
  ) {
    const body = req.body;

    await AuthSerivce.deletePermissionsGroup(body);

    return res
      .status(StatusCodes.OK)
      .json({ message: getReasonPhrase(StatusCodes.OK) });
  }

  public static async editPermissionsGroup(
    req: ValidatedRequest<typeof AuthDTO.editPermissionsGroup>,
    res: Response,
  ) {
    const group = req.body;

    await AuthSerivce.editPermissionsGroup(group);

    return res
      .status(StatusCodes.OK)
      .json({ message: getReasonPhrase(StatusCodes.OK) });
  }

  public static async searchUsers(
    req: ValidatedRequest<typeof AuthDTO.searchUsers>,
    res: Response,
  ) {
    const { q, type } = req.query;

    const users = await AuthSerivce.searchUsers(q, type);

    return res.status(StatusCodes.OK).json(users);
  }
}

export default AuthController;
