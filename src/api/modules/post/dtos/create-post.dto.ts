import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import { EnumToString } from 'src/common/helpers/enumToString';
import { Unique } from 'typeorm';
import { PostCategory } from '../enum';

@Unique(['slug', 'title'])
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  title: string;
  
  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  @Length(10,100)
  description: string;

  @IsString()
  @Length(10,255)
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
