import { ApiProperty } from '@nestjs/swagger';
import {IsBoolean, IsNotEmpty, IsNumber, IsString, MinLength} from "class-validator";

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(22)
  @ApiProperty()
  picture_path;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty()
  details: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @ApiProperty({ enum: ['SERVICE', 'PRODUCT']})
  type: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
