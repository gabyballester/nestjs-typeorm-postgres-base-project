import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { BcryptProvider, JwtProvider } from 'src/common/providers';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptProvider: BcryptProvider,
    private readonly jwtProvider: JwtProvider
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userService.getOneUserByAnyProp({ email });
    if (!user) {
      return null;
    }

    const passwordMatches = await this.bcryptProvider.comparePasswords(
      password,
      user.password,
    );

    if (!passwordMatches) {
      return null;
    }

    delete user.password;
    return user;
  }

  login(user: UserEntity) {
    // agrego todas las propiedades a meter en el payload
    return {
      user,
      accessToken: this.jwtProvider.createAccessToken(user),
      refreshToken: this.jwtProvider.createRefreshToken(user)
    };
  }
}

// import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { BcryptProvider } from 'src/common/providers/bcrypt.provider';
// import { UserEntity } from '../user/user.entity';
// import { UserRepository } from '../user/user.repository';
// import { LoginUserDto, RegisterUserDto } from './dto';
// import { JwtPayloadInterface } from './interfaces';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(UserRepository)
//     private readonly userRepository: UserRepository,
//     private readonly bcryptProvider: BcryptProvider,
//     private jwtService: JwtService
//   ) {}
//   async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
//     const { username, email, password } = registerUserDto;

//     const usernameExists = await this.userRepository.findOne({ username });
//     if (usernameExists)
//       throw new BadRequestException('Username already exists');

//     const emailExists = await this.userRepository.findOne({ email });
//     if (emailExists) throw new BadRequestException('Email already exists');

//     const newUser = this.userRepository.create(registerUserDto);
//     newUser.password = await this.bcryptProvider.encodePassword(password);
//     const user = await this.userRepository.save(newUser);

//     delete user.password;
//     return user;
//   }

//   async login(loginUserDto: LoginUserDto): Promise<any> {
//     const { email, password } = loginUserDto;
//     const user: UserEntity =  await this.userRepository.findOne({email});
//     if(!user){
//       throw new NotFoundException(`User with email ${email} not found`);
//     }

//     const emailMatches = await this.bcryptProvider.comparePasswords(password, user.password )
//     if(!emailMatches){
//       throw new UnauthorizedException('Wrong email, try again');
//     }

//     const jwtPayload: JwtPayloadInterface = {id: user.id, email, active: user.active};
//     const accessToken = this.jwtService.sign(jwtPayload);
//     return {accessToken}
//   }

// }
