import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptProvider } from 'src/common/providers/bcrypt.provider';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtPayloadInterface } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly bcryptProvider: BcryptProvider,
    private jwtService: JwtService
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
    
  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;
    const user: UserEntity =  await this.userRepository.findOne({email});
    if(!user){ 
      throw new NotFoundException(`User with email ${email} not found`);
    }
    
    const emailMatches = await this.bcryptProvider.comparePasswords(password, user.password )
    if(!emailMatches){
      throw new UnauthorizedException('Wrong email, try again');
    }
    
    const jwtPayload: JwtPayloadInterface = {id: user.id, email, active: user.active};
    const accessToken = this.jwtService.sign(jwtPayload);
    return {accessToken}
  }

}
