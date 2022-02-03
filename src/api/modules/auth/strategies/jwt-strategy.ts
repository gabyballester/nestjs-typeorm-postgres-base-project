import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { Key } from 'src/common/enum';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Key.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const { sub: id } = payload;
    return await this.userService.getOneUserService(id);
  }
}
