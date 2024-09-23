import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from './entities/role.entity';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /*
   * TODO: Aucun role ne peut etre crée, il faut donc le supprimer
   * */
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

  /*
   * TODO: Peut etre necessaire de faire une selection d'un role pour savoir qui y est affecté, a voire
   * */

  @Get(':id')
  @ApiOkResponse({ type: RoleEntity })
  async findOne(@Param('id') id: string) {
    const article = await this.rolesService.findOne(+id);
    if (!article) {
      throw new NotFoundException(`Role with ${id} does not exist.`);
    }
    return article;
  }

  /*
   * TODO: Un role ne peut pas etre modifié, il faut donc le supprimer
   * */
  @Patch(':id')
  @ApiOkResponse({ type: RoleEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  /*
   * TODO: Un role ne peut pas etre supprimé, il faut donc le supprimer
   * */
  @Delete(':id')
  @ApiOkResponse({ type: RoleEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
