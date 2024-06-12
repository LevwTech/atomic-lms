import {
  PERMISSIONS_TYPE,
  USER_TYPES,
  getPermissionsArrayForUserType,
} from "@atomic/common";
import { z } from "zod";

const checkPermissionsAndType: readonly [
  (data: any) => boolean,
  { message: string },
] = [
  (data: { permissions: PERMISSIONS_TYPE<USER_TYPES>[]; type: USER_TYPES }) => {
    const permissions = getPermissionsArrayForUserType(data.type);
    return data.permissions.every((permission) =>
      permissions.includes(permission as string),
    );
  },
  {
    message: "Permissions doesnt match user/s type",
  },
];

export class AuthDTO {
  public static login = {
    body: z.object({
      username: z.string().min(4).max(40),
      password: z.string().min(8).max(60),
    }),
  };

  public static createUser = {
    body: z
      .object({
        firstName: z.string().min(2).max(40),
        lastName: z.string().min(2).max(40),
        type: z.nativeEnum(USER_TYPES),
        username: z.string().min(4).max(40),
        password: z.string().min(8).max(60),
        email: z.string().email(),
        permissions: z.array(z.string()),
        prmissionsGroupIds: z.array(z.string().uuid()),
      })
      .refine(...checkPermissionsAndType),
  };

  public static deleteUser = {
    body: z.object({
      username: z.string().min(4).max(40),
    }),
  };

  public static addPermissions = {
    body: z.object({
      usernames: z.array(z.string().min(4).max(40)),
      permissions: z.array(z.string()),
    }),
  };

  public static createPermissionsGroup = {
    body: z
      .object({
        name: z.string().min(4).max(40),
        type: z.nativeEnum(USER_TYPES),
        permissions: z
          .array(z.string())
          .transform((val) => val as PERMISSIONS_TYPE<USER_TYPES>[]),
      })
      .refine(...checkPermissionsAndType),
  };

  public static deletePermissionsGroup = {
    body: z
      .object({
        id: z.string().uuid(),
        name: z.string().min(4).max(40),
      })
      .partial()
      .refine(
        (data) => {
          if (data.id && data.name) {
            return false;
          }
          if (!data.id && !data.name) {
            return false;
          }
          return true;
        },
        {
          message: "Must provide either id or name",
        },
      ),
  };

  public static editPermissionsGroup = {
    body: z.object({
      id: z.string().uuid(),
      name: z.string().min(4).max(40).optional(),
      addPermissions: z
        .array(z.string())
        .transform((val) => val as PERMISSIONS_TYPE<USER_TYPES>[])
        .optional(),
      removePermissions: z
        .array(z.string())
        .transform((val) => val as PERMISSIONS_TYPE<USER_TYPES>[])
        .optional(),
      addUsers: z.array(z.string().min(4).max(40)).optional(),
      removeUsers: z.array(z.string().min(4).max(40)).optional(),
    }),
  };

  public static searchUsers = {
    query: z.object({
      q: z.string().min(1).max(40),
      type: z.nativeEnum(USER_TYPES).optional(),
    }),
  };
}
