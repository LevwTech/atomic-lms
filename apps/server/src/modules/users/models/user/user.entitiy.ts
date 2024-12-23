import {
  PERMISSIONS_TYPE,
  USER_TYPES,
  getPermissionsArrayForUserType,
  getPermissionsEnumForUserType,
} from '@atomic/common';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionsGroup } from '../permissionGroup/permissionsGroup.entitiy';
import { Course } from '../../../course/models/course/course.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: USER_TYPES })
  type: USER_TYPES;

  @Column({
    array: true,
    default: [],
    type: 'text',
  })
  permissions: PERMISSIONS_TYPE<USER_TYPES>[];

  @ManyToMany(() => PermissionsGroup, (group) => group.users, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  permissionGroups: PermissionsGroup[];

  @ManyToMany(() => Course, (course) => course.students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  coursesEnrolled: Course[];

  @ManyToMany(() => Course, (course) => course.studentsCompleted, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  coursesCompleted: Course[];

  @ManyToMany(() => Course, (course) => course.teachers, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  coursesTeaching: Course[];

  @Column({ array: true, default: [], type: 'text' })
  refreshTokens: string[];

  @BeforeInsert()
  @BeforeUpdate()
  validatePermissions?() {
    const userType = this.type;
    const permissions = getPermissionsArrayForUserType(userType);
    if (!this.permissions || this.permissions.length < 1) return;

    this.permissions.forEach((permission) => {
      if (!permissions.includes(permission as string)) {
        throw new Error(`Invalid permission: ${permission}`);
      }
    });

    this.permissions = [...new Set(this.permissions)];
  }
}
