import { USER_TYPES } from '@atomic/common';
import { z } from 'zod';

export class AuthDTO {
  public static login = {
    body: z.object({
      username: z.string().min(4).max(40),
      password: z.string().min(8).max(60),
    }),
  };

  public static createUser = {
    body: z.object({
      firstName: z.string().min(2).max(40),
      lastName: z.string().min(2).max(40),
      type: z.nativeEnum(USER_TYPES),
      username: z.string().min(4).max(40),
      password: z.string().min(8).max(60),
      email: z.string().email(),
      permissions: z.array(z.string()),
      prmissionsGroupIds: z.array(z.string().uuid()),
    }),
  };
}
