import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['username', 'email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, length: 30 })
  username: string;

  @Column({ nullable: false, unique: true, length: 30 })
  email: string;

  // , select: true
  @Column({ nullable: false, length: 255 })
  password: string;

  @Column({ nullable: false, default: false })
  active: boolean;

  // @Column({ length: 50, nullable: true })
  // @IsOptional()
  // name: string;

  // @Column({ length: 50, nullable: true })
  // @IsOptional()
  // surname1: string;

  // @Column({ length: 50, nullable: true })
  // @IsOptional()
  // surname2: string;

  // @Column({nullable: true, name: 'date_of_birth'})
  // @IsOptional()
  // dateOfBirth: Date;

  // @Column({ nullable: true })
  // @IsOptional()
  // phone: string;

  // @Column({ nullable: true, name: 'mobile_phone' })
  // @IsOptional()
  // mobilePhone: string;

  // @Column({ nullable: true })
  // @IsOptional()
  // documentType: string;

  // @Column({ nullable: true })
  // @IsOptional()
  // documentNum: string;

  // @Column({ nullable: true })
  // @IsOptional()
  // gender: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
