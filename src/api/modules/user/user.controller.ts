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
import { CreateUserDto, EditUserDto } from './dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() editUserDto: EditUserDto,
  ) {
    return await this.userService.edit(id, editUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
