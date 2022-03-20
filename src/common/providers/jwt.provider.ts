import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshAccessTokenInterface } from 'src/api/modules/auth/interface';
import { UserEntity } from 'src/api/modules/user/user.entity';
import { Key } from '../enum';

@Injectable()
export class JwtProvider {
  constructor(private jwtService: JwtService) {}

  createAccessToken(user: UserEntity) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      active: user.active,
    };

    return this.jwtService.sign(payload, {
      expiresIn: Key.ACCESS_TOKEN_EXP,
    });
  }

  createRefreshToken(user: UserEntity) {
    const payload = {
      sub: user.id,
    };

    return this.jwtService.sign(payload, {
      expiresIn: Key.REFRESH_TOKEN_EXP,
    });
  }

  verifyToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
