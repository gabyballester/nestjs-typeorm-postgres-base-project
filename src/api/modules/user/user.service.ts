import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { CreateUserDto, EditUserDto } from './dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserFindOne } from './interfaces';
import { BcryptProvider } from 'src/common/providers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _bcryptProvider: BcryptProvider,
  ) {}

  async getAllUsersService(): Promise<UserEntity[]> {
    const users = await this._userRepository.find();
    if (users.length === 0) throw new NotFoundException('No users found');
    return users;
  }

  async getOneUserService(id: number): Promise<UserEntity> {
    const user = await this._userRepository.findOne(id);
    if (!user) throw new NotFoundException(`User id: ${id} not found!!`);
    return user;
  }

  async getOneUserByAnyPropService(data: UserFindOne) {
    return await this._userRepository
    .createQueryBuilder('user')
    .where(data)
    .addSelect('user.password')
    .getOne();
  }

  async createUserService(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, email, password } = createUserDto;

    const usernameExists = await this._userRepository.findOne({ username });
    if (usernameExists)
      throw new BadRequestException('Username already exists');

    const emailExists = await this._userRepository.findOne({ email });
    if (emailExists) throw new BadRequestException('Email already exists');

    const newUser = this._userRepository.create(createUserDto);
    newUser.password = await this._bcryptProvider.encodePassword(password);
    const user = await this._userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async editUserService(
    id: number,
    editUserDto: EditUserDto,
  ): Promise<UserEntity> {
    const user = await this._userRepository.findOne({ id });
    if (!user) throw new NotFoundException('User not found');

    const userToEdit = Object.assign(user, editUserDto);
    const editedUser = await this._userRepository.save(userToEdit);

    delete editedUser.password;
    return editedUser;
  }

  async deleteUserService(id: number): Promise<DeleteResult> {
    await this.getOneUserService(id);
    const deleteResult = await this._userRepository.delete(id);
    if (deleteResult.affected === 0) throw new BadRequestException();
    return deleteResult;
  }
}
