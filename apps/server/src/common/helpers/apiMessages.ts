export type API_MESSAGE_TYPE = {
  code: number;
  message: string;
};

export const API_MESSAGES = {
  EMAIL_ALREADY_EXISTS: {
    code: 409,
    message: 'Email already exists',
  },
  USERNAME_ALREADY_EXISTS: {
    code: 409,
    message: 'Username already exists',
  },
  INVALID_CREDENTIALS: {
    code: 401,
    message: 'Invalid credentials',
  },

  GROUP_ALREADY_EXISTS: {
    code: 409,
    message: 'Group already exists',
  },

  DOESNT_EXIST: {
    code: 404,
    message: 'Doesnt exist',
  },

  INVALID_PERMISSION: {
    code: 400,
    message: 'Invalid permission for user type',
  },
  COURSE_IS_NOT_BASE: {
    code: 400,
    message: 'Course is not a base course',
  },
};
