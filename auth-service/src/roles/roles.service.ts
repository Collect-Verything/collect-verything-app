import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({ data: createRoleDto });
  }

  findAll() {
    // return this.prisma.role.findMany({include: {users: true}});
    return this.prisma.role.findMany();
  }

  findOne(id: number) {
    // return this.prisma.role.findUnique({ where: { id }, include: {users: true} });
    return this.prisma.role.findUnique({ where: { id } });
  }

  //  Un role n'est pas modifiable
  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  // Un role n'est pas supprimable
  remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
