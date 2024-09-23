import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(3)
  @ApiProperty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @ApiProperty()
  phone: string;

  @ApiProperty({ type: [Number] })
  @IsArray()
  roles: number[];
}
