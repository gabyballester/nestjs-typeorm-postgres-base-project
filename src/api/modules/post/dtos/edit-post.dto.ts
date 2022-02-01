// import { PartialType, OmitType } from '@nestjs/mapped-types';
import { PartialType} from '@nestjs/swagger';
import { Unique } from 'typeorm';
import { CreatePostDto } from './create-post.dto';

@Unique(['slug', 'title'])
export class EditPostDto extends PartialType(CreatePostDto
  // OmitType(CreatePostDto, ['slug'] as const),
) {}
