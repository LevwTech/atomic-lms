import { Request, Response } from 'express';
import { AuthDTO } from '@atomic/dto';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import AuthSerivce from '../services/auth';
import { ValidatedRequest } from '../../../common/middlewares/validationMiddleware';
import { API_ERROR } from '../../../common/helpers/throwApiError';

class AuthController {
  public static async login(
    req: ValidatedRequest<typeof AuthDTO.login>,
    res: Response
  ) {
    const { username, password } = req.body;

    try {
      const tokens = await AuthSerivce.login(username, password);

      return res.status(StatusCodes.OK).json(tokens);
    } catch (err) {
      if (err instanceof API_ERROR) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }

  public static async createUser(
    req: ValidatedRequest<typeof AuthDTO.createUser>,
    res: Response
  ) {
    const createUserData = req.body;

    try {
      await AuthSerivce.createUser(createUserData);

      return res
        .status(StatusCodes.CREATED)
        .json({ message: getReasonPhrase(StatusCodes.CREATED) });
    } catch (err) {
      if (err instanceof API_ERROR) {
        return res.status(err.code).json({ message: err.message });
      }
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }

  public static async refreshToken(req: Request, res: Response) {
    const authToken = req.headers.authorization;

    try {
      const tokens = await AuthSerivce.refreshToken(authToken!.split(' ')[1]);

      return res.status(StatusCodes.OK).json(tokens);
    } catch (err) {
      if (err instanceof API_ERROR) {
        return res.status(err.code).json({ message: err.message });
      }
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
}

export default AuthController;
