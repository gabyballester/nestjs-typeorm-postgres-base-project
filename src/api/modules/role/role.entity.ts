/* eslint-disable @typescript-eslint/no-unused-vars */
import { RoleStatusEnum, RoleName } from './enums';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { IRole } from './interfaces/role.interface';

@Entity('roles')
export class RoleEntity extends BaseEntity implements IRole {
  
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', nullable: false, enum: RoleName })
  name: RoleName;

  @Column({ type: 'text', nullable: false })
  description: string;

  @OneToMany((type) => UserEntity, (user) => user.role)
  users: UserEntity[];

  @Column({ type: 'enum', default: RoleStatusEnum.INACTIVE, enum: RoleStatusEnum })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}