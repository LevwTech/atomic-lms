import { USER_TYPES } from '@atomic/common';

export type tokenBodyType = {
  username: string;
  email: string;
  type: USER_TYPES;
};
