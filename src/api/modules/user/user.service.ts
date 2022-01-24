import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptProvider } from 'src/common/providers/bcrypt.provider';
import { DeleteResult } from 'typeorm';

import { CreateUserDto, EditUserDto } from './dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly bcryptProvider: BcryptProvider,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users) throw new NotFoundException('No users found');
    return users;
  }

  async getOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, email, password } = createUserDto;

    const usernameExists = await this.userRepository.findOne({ username });
    if (usernameExists)
      throw new BadRequestException('Username already exists');

    const emailExists = await this.userRepository.findOne({ email });
    if (emailExists) throw new BadRequestException('Email already exists');

    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await this.bcryptProvider.encodePassword(password);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async edit(id: string, editUserDto: EditUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException('User not found');
    const editedUser = Object.assign(user, editUserDto);
    return await this.userRepository.save(editedUser);
  }

  async delete(id: string): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException();
    const deleteResult = await this.userRepository.delete(id);
    if (deleteResult.affected === 0) throw new BadRequestException();
    return deleteResult;
  }
}
