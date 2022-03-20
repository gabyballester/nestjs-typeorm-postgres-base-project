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
import { CreateRoleDto, EditRoleDto } from './dtos';
import { RoleService } from './role.service';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get()
  async getAllRoles() {
    const roles = await this._roleService.getAllRolesService();
    return { message: 'Roles found!!', roles };
  }

  @Get(':id')
  async getOneRole(@Param('id') id: number) {
    const data = await this._roleService.getOneRoleService(id);
    return { message: `Role id: ${id} found!!`, data };
  }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const data = await this._roleService.createRoleService(createRoleDto);
    return { message: 'Role created', data };
  }

  @Put(':id')
  async editRole(@Param('id') id: number, @Body() editRoleDto: EditRoleDto) {
    return await this._roleService.editRoleService(id, editRoleDto);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: number) {
    const { affected } = await this._roleService.deleteRoleService(id);
    const elementWord = affected === 1 ? 'element' : 'elements';
    return {
      message:
        affected === 0
          ? `Not ${elementWord} deleted`
          : `Deleted ${affected} ${elementWord}`,
    };
  }
}
