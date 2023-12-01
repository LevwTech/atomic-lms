import { User } from '../../modules/users/models/user/user.entitiy';

export default function getAllUserPermissions(user: User) {
  const userGrantedPermissions = [...user.permissions];

  for (const permissionsGroup of user.permissionGroups) {
    userGrantedPermissions.push(...permissionsGroup.permissions);
  }

  return userGrantedPermissions;
}
