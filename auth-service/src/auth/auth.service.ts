import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcryptjs';
import { ROLENAME_ID } from './enum';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      include: { role: true },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        role: user.role.name,
        id_stripe: user.id_stripe,
        lastname: user.lastname,
        firstname: user.firstname,
      }),
    };
  }
  /**
   * Enregistre un nouvel utilisateur dans la base via Prisma.
   *
   * Le DTO `CreateUserDto` contient un champ `roleId` destiné à la logique côté client ou validation,
   * mais qui ne doit pas être directement envoyé dans la requête Prisma.
   *
   * Pour s’assurer que Prisma accepte correctement l’objet `data`, on extrait `roleId` du DTO
   * avec une destructuration :
   *
   * ```ts
   * const { roleId, ...userData } = createUserDto;
   * ```
   *
   * On utilise ensuite `userData` pour construire l'objet envoyé à `prisma.user.create`,
   * en ajoutant manuellement :
   * - le mot de passe haché (`bcrypt`)
   * - l'association au rôle par ID via `connect`
   *
   * Cela permet :
   * - d’isoler la logique Prisma de la structure du DTO
   * - d’éviter d’envoyer des champs non attendus à Prisma
   * - d’imposer un rôle fixe à l’enregistrement (ex. `ROLENAME_ID.USER`)
   */

  async register(createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roleId, ...userData } = createUserDto;

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: {
          connect: { id: ROLENAME_ID.USER },
        },
      },
      include: { role: true },
    });
  }

  async forgotPassword(mail: { email: string }) {
    const currentUser = await this.usersService.findOneByMail(mail.email);
    return await this.usersService.updateForgotPassword(
      currentUser.id,
      mail.email,
    );
  }
}
