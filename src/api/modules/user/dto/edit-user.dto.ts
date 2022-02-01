import { IsEmail, IsNotEmpty, IsString, Length, Max, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Unique } from 'typeorm';

@Unique(['username', 'email'])
export class EditUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  readonly username: string;

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
}
