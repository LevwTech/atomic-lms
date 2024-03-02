import { USER_TYPES } from '../constants';
import ADMIN_PERMISSIONS from './admin';
import STAFF_PERMISSIONS from './staff';
import TEACHER_PERMISSIONS from './teacher';
import STUDENT_PERMISSIONS from './student';
import FINANCE_PERMISSIONS from './finance';

export type PERMISSIONS_TYPE<T extends USER_TYPES> = T extends USER_TYPES.ADMIN
  ? ADMIN_PERMISSIONS
  : T extends USER_TYPES.STAFF
  ? STAFF_PERMISSIONS
  : T extends USER_TYPES.TEACHER
  ? TEACHER_PERMISSIONS
  : T extends USER_TYPES.STUDENT
  ? STUDENT_PERMISSIONS
  : T extends USER_TYPES.FINANCE
  ? FINANCE_PERMISSIONS
  : never;

export const getPermissionsEnumForUserType = (
  type: USER_TYPES
): PERMISSIONS_TYPE<typeof type> | null => {
  switch (type) {
    case USER_TYPES.ADMIN:
      return ADMIN_PERMISSIONS as unknown as PERMISSIONS_TYPE<typeof type>;
    case USER_TYPES.STAFF:
      return STAFF_PERMISSIONS as unknown as PERMISSIONS_TYPE<typeof type>;
    case USER_TYPES.TEACHER:
      return TEACHER_PERMISSIONS as unknown as PERMISSIONS_TYPE<typeof type>;
    case USER_TYPES.STUDENT:
      return STUDENT_PERMISSIONS as unknown as PERMISSIONS_TYPE<typeof type>;
    case USER_TYPES.FINANCE:
      return FINANCE_PERMISSIONS as unknown as PERMISSIONS_TYPE<typeof type>;
    default:
      return null;
  }
};

export const getPermissionsArrayForUserType = (type: USER_TYPES) => {
  switch (type) {
    case USER_TYPES.ADMIN:
      return Object.values(ADMIN_PERMISSIONS);
    case USER_TYPES.STAFF:
      return Object.values(STAFF_PERMISSIONS);
    case USER_TYPES.TEACHER:
      return Object.values(TEACHER_PERMISSIONS);
    case USER_TYPES.STUDENT:
      return Object.values(STUDENT_PERMISSIONS);
    case USER_TYPES.FINANCE:
      return Object.values(FINANCE_PERMISSIONS);
  }
};
