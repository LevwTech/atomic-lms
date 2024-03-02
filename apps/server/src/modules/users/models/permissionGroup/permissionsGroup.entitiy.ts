import {
  PERMISSIONS_TYPE,
  USER_TYPES,
  getPermissionsEnumForUserType,
} from '@atomic/common';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entitiy';

@Entity()
export class PermissionsGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'enum', enum: USER_TYPES })
  type: USER_TYPES;

  @Column({
    array: true,
    default: [],
    type: 'text',
  })
  permissions: PERMISSIONS_TYPE<typeof this.type>[];

  @ManyToMany(() => User, (user) => user.permissionGroups, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  users: Promise<User[]>;

  @BeforeInsert()
  @BeforeUpdate()
  validatePermissions() {
    const groupType = this.type;
    const permissions = Object.values(
      getPermissionsEnumForUserType(groupType)!
    );

    if (!this.permissions || this.permissions.length < 1) return;

    this.permissions.forEach((permission) => {
      if (!permissions.includes(permission)) {
        throw new Error(`Invalid permission: ${permission}`);
      }
    });

    this.permissions = [...new Set(this.permissions)];
  }
}
