import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class EditUserDto {
  
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
