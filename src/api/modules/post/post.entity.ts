import {
  IsArray,
  IsEnum,
  IsString,
  Length,
} from 'class-validator';
import { EnumToString } from 'src/common/helpers/enumToString';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PostCategory } from './enums';

@Entity({ name: 'posts' })
@Unique(['slug', 'title'])
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true, length: 100 })
  title: string;
  
  @Column({ type: 'text', nullable: false, unique: true })
  slug: string;

  @Column({ type: 'varchar', nullable: true, unique: false, length: 100 })
  description: string;

  @Column({ type: 'varchar', nullable: true, unique: false, length: 255 })
  content: string;

  @IsEnum(PostCategory, {
    message: `Invalid option. Valid options are ${EnumToString(PostCategory)}`,
  })
  @Column({ type: 'enum', nullable: true, enum: PostCategory })
  category: PostCategory;

  @IsArray()
  @IsString({ each: true })
  @Column({type: 'simple-array', nullable: true, unique: false })
  tags: string[];

  @Column({type: 'bool', nullable: false, default: false })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
