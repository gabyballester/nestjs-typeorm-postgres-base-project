import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['username','email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', unique: true, length: 30, nullable: false })
  username: string;

  @Column({ type: 'varchar', unique: true, length: 30, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: true })
  password: string;

  @Column({ type: Boolean, default: false, nullable: false })
  active: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  surname1: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  surname2: string;

  @Column({ type: 'varchar', nullable: true, name: 'date_of_birth'})
  @IsOptional()
  dateOfBirth: Date;

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  phone: string;

  @Column({ type: 'varchar', nullable: true, name: 'mobile_phone' })
  @IsOptional()
  mobilePhone: string;

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  documentType: string;
  
  
  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  documentNum: string;

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  gender: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

