import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RoleEntity } from '../../roles/entities/role.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;
  @Exclude()
  password: string;
  @ApiProperty()
  birthDate: Date;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  role: RoleEntity;
  @ApiProperty()
  roleId: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
