import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    RolesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
