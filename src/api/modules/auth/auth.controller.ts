import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authService.register(registerUserDto);
  }
}
