import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleStatusEnum, RoleName } from '../enum';
import { EnumToString } from 'src/common/helpers/enumToString';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 20)
  @IsEnum(RoleName, {
    message: `Invalid option. Valid options are ${EnumToString(RoleName)}`,
  })
  name: RoleName;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(RoleStatusEnum, {
    message: `Invalid option. Valid options are ${EnumToString(RoleStatusEnum)}`,
  })
  status: string;
}
