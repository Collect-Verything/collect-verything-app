import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { generateRandomPassword } from '../utils';
import { ClientProxy } from '@nestjs/microservices';
import { configEnv } from '../../env-config';

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
  constructor(
    private prisma: PrismaService,
    @Inject('MAIL_SERVICE') private client: ClientProxy,
  ) {}

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

  /*
   * Simple user only
   * */
  findAll() {
    return this.prisma.user.findMany({
      where: { roleId: 1 },
      include: { role: true },
    });
  }

  /*
   * Simple jobber only
   * */
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

  findOneByMail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
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

  async updateUserIdStripe(userId: number, userStripId: string) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        id_stripe: userStripId,
      },
    });
  }

  async updatePassword(id: number, updatePasswordDto: UpdateUserPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid old password');
    }

    const hashedPassword = await bcrypt.hash(
      updatePasswordDto.newPassword,
      roundsOfHashing,
    );

    return this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
      include: { role: true },
    });
  }

  async updateForgotPassword(id: number, email: string) {
    const newPassword = generateRandomPassword(10);
    const newPasswordEncrypt = await bcrypt.hash(newPassword, roundsOfHashing);

    const message = {
      email,
      password: newPassword,
    };

    console.log(
      '📤     Sent on queue : --[ ' +
        configEnv.FORGOT_PASSWORD_PATTERN +
        ' ]--',
    );

    this.client.emit(configEnv.FORGOT_PASSWORD_PATTERN, message);
    return this.prisma.user.update({
      where: { id },
      data: { password: newPasswordEncrypt },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
