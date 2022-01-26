import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Key } from "src/common/enum";
import { UserEntity } from "../../user/user.entity";
import { UserRepository } from "../../user/user.repository";
import { JwtPayloadInterface } from "../interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){
    super({
      secretOrKey: Key.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
    })
  }
  
  async validate(payload: JwtPayloadInterface): Promise<UserEntity>{
    const {email} = payload;
    const user = this.userRepository.findOne(email);
    
    if(!user){
      throw new UnauthorizedException();
    }
    
    return user;
  }
  
}
