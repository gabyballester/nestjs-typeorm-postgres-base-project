import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class TokenDto {
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly refreshToken: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly accessToken: string;
}