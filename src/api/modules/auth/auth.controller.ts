import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDecorator, UserDecorator } from 'src/common/decorators';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserDto, TokenDto } from './dtos';
import { LocalAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const data = await this._authService.registerUserService(registerUserDto);
    return { message: 'User created', data };
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@UserDecorator() user: UserEntity) {
    const data = this._authService.loginService(user);
    return {
      message: 'Login correcto!!',
      data,
    };
  }

  @AuthDecorator()
  @Post('profile')
  profile(@UserDecorator() user: UserEntity) {
    return {
      message: 'Petición correcta!!',
      user,
    };
  }

  @Post('refresh-access-token')
  async refreshAccessToken(@Body() tokenDto: TokenDto): Promise<any> {
    return await this._authService.refreshAccessTokenService(tokenDto.refreshToken);
  }
}
