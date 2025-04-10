import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import {UsersModule} from "../users/users.module";
import {JwtStrategy} from "./guards/authentication/jwt.strategy";
import {ClientsModule, Transport} from "@nestjs/microservices";

export const jwtSecret = 'CollectVerythingSecret';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://broker-service'], // adresse du container RabbitMQ
          queue: 'forgot-password',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}