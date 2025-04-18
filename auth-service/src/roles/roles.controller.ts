import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from './entities/role.entity';
import { configEnv } from '../../env-config';

@Controller(configEnv.AUTH_URL_ROLES)
@ApiTags(configEnv.AUTH_URL_ROLES)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

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
}
