import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

/*
* Un user super admin ne peut que etre super admin
* Un user de type USER ne peut que etre super USER
* Un user de type Metier  peut avoir plusieur metiers
* */

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { roles, ...userData } = createUserDto;
    userData.password = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    return this.prisma.user.create({
      data: {
        ...userData,
        roles: {
          connect: roles.map((roleId) => ({ id: roleId })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findAllUserJob() {
    return this.prisma.user.findMany({
      where: {
        roles: {
          none: {
            name: "USER"
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { roles: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { roles, ...userData } = updateUserDto;
    if (updateUserDto.password) {
      userData.password = await bcrypt.hash(
          updateUserDto.password,
          roundsOfHashing,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        roles: roles
          ? {
              set: roles.map((roleId) => ({ id: roleId })),
            }
          : undefined,
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
