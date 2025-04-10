import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {MessageBrokerService} from "../message-broker/auth";

@Module({
  controllers: [UsersController],
  providers: [UsersService,MessageBrokerService],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
