import {
  BadRequestException,
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { BcryptProvider, JwtProvider } from 'src/common/providers';
import { RegisterUserDto, UserAndTokensResponseDto } from './dtos';
import { UserRepository } from '../user/user.repository';
import { FunctionsProvider } from 'src/common/providers/functions.provider';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _bcryptProvider: BcryptProvider,
    private readonly _jwtProvider: JwtProvider,
    private readonly _userRepository: UserRepository,
    private readonly _functionsProvider: FunctionsProvider,
  ) {}

  async registerUserService(registerUserDto: RegisterUserDto): Promise<any> {
    const { email, password, repeatPassword } = registerUserDto;

    const passwordMatch = password === repeatPassword;
    if (!passwordMatch) throw new BadRequestException('Password must be equal');

    const emailExists = await this._userService.getOneUserByAnyPropService({
      email,
    });
    if (emailExists) throw new BadRequestException('Email already exists');

    const newUser = this._userRepository.create(registerUserDto);
    newUser.password = await this._bcryptProvider.encodePassword(password);
    newUser.username = this._functionsProvider.extractUsernameByEmail(email);
    const user = await this._userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this._userService.getOneUserByAnyPropService({ email });
    if (!user) {
      return null;
    }

    const passwordMatch = await this._bcryptProvider.comparePasswords(
      password,
      user.password,
    );

    if (!passwordMatch) {
      return null;
    }

    delete user.password;
    return user;
  }

  loginService(user: UserEntity): UserAndTokensResponseDto {
    return {
      user,
      accessToken: this._jwtProvider.createAccessToken(user),
      refreshToken: this._jwtProvider.createRefreshToken(user),
    };
  }

  async refreshAccessTokenService(refreshToken: string): Promise<any> {
    const { sub, exp } = await this._jwtProvider.verifyToken(refreshToken);
    const currentDate = moment().unix();
    if (currentDate > exp) {
      throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
    } else {
      const user = await this._userService.getOneUserByAnyPropService(sub);
      if (!user) {
        throw new NotFoundException(`User id: ${sub} not found!!`);
      } else {
        return {
          accessToken: this._jwtProvider.createAccessToken(user),
          refreshToken,
        };
      }
    }
  }
}
