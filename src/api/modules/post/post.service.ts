import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  async getAllPostsService(): Promise<PostEntity[]> {
    const posts = await this.postRepository.find();
    if (posts.length===0) throw new NotFoundException('No posts found');
    return posts;
  }

  async getOnePostService(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundException(`Post id: ${id}, not found`);
    return post;
  }

  async createPostService(createPostDto: CreatePostDto,  owner: UserEntity): Promise<PostEntity> {
    const post = this.postRepository.create({...createPostDto, owner});
    return await this.postRepository.save(post);
  }

  async editPostService(
    id: number,
    editPostDto: EditPostDto,
  ): Promise<PostEntity> {
    const post = await this.getOnePostService(id);
    const editedPost = Object.assign(post, editPostDto);
    return await this.postRepository.save(editedPost);
  }

  async deletePostService(id: number): Promise<DeleteResult> {
    await this.getOnePostService(id);
    const deleteResult = await this.postRepository.delete(id);
    if (deleteResult.affected === 0) throw new BadRequestException();
    return deleteResult;
  }
}
