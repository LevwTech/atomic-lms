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
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionsGroup } from '../permissionGroup/permissionsGroup.entitiy';

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

  @ManyToMany(() => PermissionsGroup, (group) => group.users, { eager: true })
  @JoinTable()
  permissionGroups: PermissionsGroup[];

  @Column({ array: true, default: [], type: 'text' })
  refreshTokens: string[];

  @BeforeInsert()
  @BeforeUpdate()
  validatePermissions() {
    const userType = this.type;
    const permissions = Object.values(getPermissionsEnumForUserType(userType)!);
    if (!this.permissions || this.permissions.length < 1) return;

    this.permissions.forEach((permission) => {
      if (!permissions.includes(permission)) {
        throw new Error(`Invalid permission: ${permission}`);
      }
    });
  }
}
