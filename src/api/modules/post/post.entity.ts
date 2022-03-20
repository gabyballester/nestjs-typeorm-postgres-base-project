import { IsArray, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PostCategory } from './enum';

@Entity({ name: 'posts' })
@Unique(['slug', 'title'])
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: false, length: 100 })
  title: string;

  @Column({ type: 'text', nullable: false, unique: false })
  slug: string;

  @Column({ type: 'varchar', nullable: true, unique: false, length: 100 })
  description: string;

  @Column({ type: 'varchar', nullable: true, unique: false, length: 255 })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    eager: false,
    nullable: false,
  })
  owner: UserEntity;

  // @JoinColumn({name: 'author' })
  // author: UserEntity;
  // @IsEnum(PostCategory, {
  //   message: `Invalid option. Valid options are ${EnumToString(PostCategory)}`,
  // })
  @Column({ type: 'enum', nullable: true, enum: PostCategory })
  category: PostCategory;

  @IsArray()
  @IsString({ each: true })
  @Column({ type: 'simple-array', nullable: true, unique: false })
  tags: string[];

  @Column({ type: 'bool', nullable: false, default: false })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
