import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { CreateUserDto, EditUserDto } from './dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}


  async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users) throw new NotFoundException();
    return users;
  }

  async getOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username } = createUserDto;
    const userExists = await this.userRepository.findOne({ username });
    if (userExists)
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async edit(id: number, editUserDto: EditUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException;
    const editedUser = Object.assign(user, editUserDto);
    return await this.userRepository.save(editedUser);
  }

  async delete(id: number): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException;
    return this.userRepository.delete(id);
  }
}
