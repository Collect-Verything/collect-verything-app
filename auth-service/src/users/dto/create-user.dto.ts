import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../../roles/entities/role.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  id_stripe: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  lastname: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  // @IsPhoneNumber(null)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({ type: () => RoleEntity })
  @IsOptional()
  role: RoleEntity;
}
