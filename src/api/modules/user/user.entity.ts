import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['username'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 30, nullable: false} )
  username: string;
  
  @Column({type: "varchar", length: 30, nullable: false} )
  email: string;

  @Column({type: "varchar", length: 255, nullable: false} )
  password: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
}
