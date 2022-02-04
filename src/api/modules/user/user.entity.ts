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

  @Column({ type: 'varchar', nullable: true, unique: true, length: 30 })
  username: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 255, select: false })
  password: string;

  @Column({ type: 'bool', nullable: false, default: false })
  active: boolean;

  @Column({ type: 'varchar', nullable: true, length: 30 })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  surname1: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  surname2: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

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
