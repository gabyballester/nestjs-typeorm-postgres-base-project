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
  async getAllUsers() {
    const users = await this.userService.getAllUsersService();
    return { message: 'Users found!!', users };
  }

  @Get(':id')
  async getOneUser(@Param('id') id: number) {
    const data = await this.userService.getOneUserService(id);
    return { message: `User id: ${id} found!!`, data };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.createUserService(createUserDto);
    return { message: 'User created', data };
  }

  @Put(':id')
  async editUser(@Param('id') id: number, @Body() editUserDto: EditUserDto) {
    return await this.userService.editUserService(id, editUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const { affected } = await this.userService.deleteUserService(id);
    const elementWord = affected === 1 ? 'element' : 'elements';
    return {
      message:
        affected === 0
          ? `Not ${elementWord} deleted`
          : `Deleted ${affected} ${elementWord}`,
    };
  }
}
