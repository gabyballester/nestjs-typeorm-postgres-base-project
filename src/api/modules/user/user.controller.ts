import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto, EditUserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return { message: 'Users found', users }
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const data = await this.userService.getOne(id);
    return { message: 'User found', data}
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);
    return { message: 'User created', data}
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() editUserDto: EditUserDto,
  ) {
    return await this.userService.edit(id, editUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string)  {
    const {affected} = await this.userService.delete(id);
    const elementWord = affected===1? 'element' : 'elements'
    return {
      message: affected===0 ? `Not ${elementWord} deleted` : `Deleted ${affected} ${elementWord}`
    }
  }
}
