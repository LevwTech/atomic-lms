import { Request, Response } from 'express';
import { AuthDTO } from '@atomic/dto';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import AuthSerivce from '../services/auth';
import { ValidatedRequest } from '../../../common/middlewares/validationMiddleware';

class AuthController {
  public static async login(
    req: ValidatedRequest<typeof AuthDTO.login>,
    res: Response
  ) {
    const { username, password } = req.body;

    const tokens = await AuthSerivce.login(username, password);

    return res.status(StatusCodes.OK).json(tokens);
  }

  public static async createUser(
    req: ValidatedRequest<typeof AuthDTO.createUser>,
    res: Response
  ) {
    const { firstName, lastName, type, username, password, email } = req.body;

    await AuthSerivce.createUser({
      firstName,
      lastName,
      type,
      username,
      password,
      email,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: getReasonPhrase(StatusCodes.CREATED) });
  }

  public static async refreshToken(req: Request, res: Response) {
    const authToken = req.headers.authorization;

    const tokens = await AuthSerivce.refreshToken(authToken!.split(' ')[1]);

    return res.status(StatusCodes.OK).json(tokens);
  }
}

export default AuthController;
