import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDecorator, UserDecorator } from 'src/common/decorators';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@UserDecorator() user: UserEntity) {
    const data = this.authService.login(user);
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

// import { UserEntity } from '../user/user.entity';
// import { AuthService } from './auth.service';
// import { LoginUserDto, RegisterUserDto } from './dto';

//   constructor(private authService: AuthService) {}

//   @Post('register')
//   register(@Body() registerUserDto: RegisterUserDto): Promise<UserEntity> {
//     return this.authService.register(registerUserDto);
//   }

//   @Post('login')
//   login(@Body() loginUserDto: LoginUserDto): Promise<string> {
//     return this.authService.login(loginUserDto);
//   }
