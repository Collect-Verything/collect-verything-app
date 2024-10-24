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
 *
 * Au moment de la creation d'un user, l'assignation d'un role st obligatoire, faire le necessaire dans le front
 * */

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { roleId, ...userData } = createUserDto; // `roleId` est utilisé au lieu de `roles`

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: {
          connect: { id: roleId },
        },
      },
      include: { role: true },
    });
  }

  async createJobber(createUserDto: CreateUserDto) {
    const { roleId, ...userData } = createUserDto; // `roleId` est utilisé au lieu de `roles`

    // TODO : Envoyer un mail a ce nouveau user avec son nouveau mot de passe
    const hashedPassword = await bcrypt.hash('InitPassword', roundsOfHashing);

    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: {
          connect: { id: roleId },
        },
      },
      include: { role: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findAllUserJob() {
    return this.prisma.user.findMany({
      where: {
        NOT: {
          roleId: 1,
        },
      },
      include: { role: true },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { roleId, ...userData } = updateUserDto;

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
        role: roleId
          ? {
              connect: { id: roleId },
            }
          : undefined,
      },
      include: { role: true },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
