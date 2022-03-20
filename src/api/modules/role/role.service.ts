import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateRoleDto, EditRoleDto } from './dtos';
import { RoleEntity } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async getAllRolesService(): Promise<RoleEntity[]> {
    const roles: RoleEntity[] = await this._roleRepository.find();
    if (roles.length === 0) throw new NotFoundException('No roles found');
    return roles;
  }

  async getOneRoleService(id: number): Promise<RoleEntity> {
    const role = await this._roleRepository.findOne(id);
    if (!role) throw new NotFoundException(`Role id: ${id} not found!!`);
    return role;
  }

  async createRoleService(role: CreateRoleDto): Promise<RoleEntity> {
    const roleExists = await this._roleRepository.findOne(role);
    if (roleExists) throw new BadRequestException('Role already exists');
    return await this._roleRepository.save(role);
  }

  async editRoleService(
    id: number,
    editRoleDto: EditRoleDto,
  ): Promise<RoleEntity> {
    const role = await this._roleRepository.findOne({ id });
    if (!role) throw new NotFoundException('Role not found');
    const roleToEdit = Object.assign(role, editRoleDto);
    return await this._roleRepository.save(roleToEdit);
  }

  async deleteRoleService(id: number): Promise<DeleteResult> {
    await this.getOneRoleService(id);
    const deleteResult = await this._roleRepository.delete(id);
    if (deleteResult.affected === 0) throw new BadRequestException();
    return deleteResult;
  }
}
