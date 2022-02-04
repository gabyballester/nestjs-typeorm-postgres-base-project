import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { BcryptProvider, JwtProvider } from 'src/common/providers';
import { RegisterUserDto } from './dto';
import { UserRepository } from '../user/user.repository';
import { FunctionsProvider } from 'src/common/providers/functions.provider';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptProvider: BcryptProvider,
    private readonly jwtProvider: JwtProvider,
    private readonly userRepository: UserRepository,
    private readonly functionsProvider: FunctionsProvider
  ) {}
  
  async registerUserService(registerUserDto: RegisterUserDto): Promise<any> {
    const { email, password, repeatPassword } = registerUserDto;

    const passwordMatch = password === repeatPassword;
    if (!passwordMatch) throw new BadRequestException('Password must be equal');

    const emailExists = await this.userService.getOneUserByAnyPropService({ email });
    if (emailExists) throw new BadRequestException('Email already exists');

    const newUser = this.userRepository.create(registerUserDto);
    newUser.password = await this.bcryptProvider.encodePassword(password);
     newUser.username = this.functionsProvider.extractUsernameByEmail(email);    
    const user = await this.userRepository.save(newUser);
    
    delete user.password;
    return user;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userService.getOneUserByAnyPropService({ email });
    if (!user) {
      return null;
    }

    const passwordMatch = await this.bcryptProvider.comparePasswords(
      password,
      user.password,
    );

    if (!passwordMatch) {
      return null;
    }

    delete user.password;
    return user;
  }

  loginService(user: UserEntity) {
    // agrego todas las propiedades a meter en el payload
    return {
      user,
      accessToken: this.jwtProvider.createAccessToken(user),
      refreshToken: this.jwtProvider.createRefreshToken(user)
    };
  }
}