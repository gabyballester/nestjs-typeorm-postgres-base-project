import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Unique } from 'typeorm';

@Unique(['email'])
export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly password: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly repeatPassword: string;
}
