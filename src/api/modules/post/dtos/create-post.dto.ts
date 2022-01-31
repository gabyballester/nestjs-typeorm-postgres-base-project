import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EnumToString } from 'src/common/helpers/enumToString';
import { PostCategory } from '../enums';

export class CreatePostDto {
  @IsString()
  slug: string;
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  description: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsNotEmpty()
  @IsEnum(PostCategory, {
    message: `Invalid option. Valid options are ${EnumToString(PostCategory)}`,
  })
  category: PostCategory;


  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
