import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { configEnv } from '../../env-config';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${configEnv.MESSAGE_BROKER_URL}`],
          queue: configEnv.EMAIL_QUEUE,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
