import { PermissionsGroup } from './modules/users/models/permissionGroup/permissionsGroup.entitiy';
import { User } from './modules/users/models/user/user.entitiy';
import { Course } from './modules/course/models/course/course.entity';
import { CourseGroup } from './modules/course/models/courseGroup/courseGroup.entity';
const entities = [User, PermissionsGroup, Course, CourseGroup];

export default entities;
