import { IsNotEmpty, IsString } from "class-validator";
import { UserEntity } from "../../user/user.entity";

export class UserAndTokensResponseDto {
  
  @IsNotEmpty()
  readonly user: UserEntity;
  
  @IsNotEmpty()
  @IsString()
  accessToken: string;
  
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}