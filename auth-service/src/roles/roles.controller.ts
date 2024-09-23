import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {RoleEntity} from "./entities/role.entity";

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiCreatedResponse({ type: RoleEntity })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RoleEntity })
  async findOne(@Param('id') id: string) {
    const article = await this.rolesService.findOne(+id);
    if (!article) {
      throw new NotFoundException(`Role with ${id} does not exist.`);
    }
    return article;
  }

  @Patch(':id')
  @ApiOkResponse({ type: RoleEntity })
  update(@Param('id',ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RoleEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
