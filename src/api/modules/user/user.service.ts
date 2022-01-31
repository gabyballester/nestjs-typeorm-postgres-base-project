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

  async getAllUsersService(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (users.length===0) throw new NotFoundException('No users found');
    return users;
  }

  async getOneUserService(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`User id: ${id} not found!!`);
    return user;
  }

  async createUserService(createUserDto: CreateUserDto): Promise<UserEntity> {
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

  async editUserService(
    id: number,
    editUserDto: EditUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException('User not found');
    const editedUser = Object.assign(user, editUserDto);
    return await this.userRepository.save(editedUser);
  }

  async deleteUserService(id: number): Promise<DeleteResult> {
    await this.getOneUserService(id);
    const deleteResult = await this.userRepository.delete(id);
    if (deleteResult.affected === 0) throw new BadRequestException();
    return deleteResult;
  }
}
