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
import {ClientProxy} from "@nestjs/microservices";
import { Inject } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject('MAIL_SERVICE') private client: ClientProxy
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
    // const currentUser = await this.usersService.findOneByMail(mail.email);
    // TODO : Fix response
    // const res = await this.usersService.updateForgotPassword(currentUser.id);

    const message = {
      "pattern": "forgot-password",
      "data": "test"
    }

    this.client.emit('forgot-password', message); // pattern + data

    return { };
  }
}
