import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDecorator, UserDecorator } from 'src/common/decorators';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts() {
    const data = await this.postService.getAllPostsService();
    return { message: 'Posts found!!', data };
  }

  @Get(':id')
  async getOnePost(@Param('id', ParseIntPipe) id: number) {
    const data = await this.postService.getOnePostService(id);
    return { message: 'Post found!!', data };
  }

  @AuthDecorator()
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @UserDecorator() owner) {
    const data = await this.postService.createPostService(createPostDto, owner);
    return { message: 'Post created!!', data };
  }

  @Put(':id')
  async editPost(@Param('id') id: number, @Body() editPostDto: EditPostDto) {
    const editedPost = await this.postService.editPostService(id, editPostDto);
    return { message: 'Post edited!!', editedPost };
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    const { affected } = await this.postService.deletePostService(id);
    const elementWord = affected === 1 ? 'element' : 'elements';
    return {
      message:
        affected === 0
          ? `Not ${elementWord} deleted`
          : `Deleted ${affected} ${elementWord}`,
    };
  }
}
