import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptProvider } from 'src/common/providers/bcrypt.provider';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly bcryptProvider: BcryptProvider,
  ) {}
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { username, email, password } = registerUserDto;

    const usernameExists = await this.userRepository.findOne({ username });
    if (usernameExists)
      throw new BadRequestException('Username already exists');

    const emailExists = await this.userRepository.findOne({ email });
    if (emailExists) throw new BadRequestException('Email already exists');

    const newUser = this.userRepository.create(registerUserDto);
    newUser.password = await this.bcryptProvider.encodePassword(password);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }
}
