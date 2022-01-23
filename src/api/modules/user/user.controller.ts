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

import { CreateUserDto, EditUserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('Users')
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
  async delete(@Param('id') id: number)  {
    const {affected} = await this.userService.delete(id);
    const elementWord = affected===1? 'element' : 'elements'
    return {
      message: affected===0 ? `Not ${elementWord} deleted` : `Deleted ${affected} ${elementWord}`
    }
  }
}
