import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDecorator, UserDecorator } from 'src/common/decorators';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
import { LocalAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const data = await this.authService.registerUserService(registerUserDto);
    return { message: 'User created', data };
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@UserDecorator() user: UserEntity) {
    const data = this.authService.loginService(user);
    return {
      message: 'Login correcto!!',
      data,
    };
  }

  @AuthDecorator()
  @Post('profile')
  profile(@UserDecorator() user: UserEntity) {
    return {
      message: 'Petición correcta exitoso',
      user,
    };
  }
}
