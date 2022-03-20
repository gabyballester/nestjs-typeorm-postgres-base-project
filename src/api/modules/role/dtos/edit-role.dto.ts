import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { RoleName } from '../enum';
import { EnumToString } from 'src/common/helpers/enumToString';

export class EditRoleDto {
  @ApiProperty()
  @IsOptional()
  @Length(1, 20)
  @IsEnum(RoleName, {
    message: `Invalid option. Valid options are ${EnumToString(RoleName)}`,
  })
  readonly name: RoleName;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(6, 100)
  readonly description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(8)
  readonly status: string;
}
