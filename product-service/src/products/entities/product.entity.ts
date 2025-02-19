import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  picture_path: string;

  @ApiProperty()
  stripe_id: string;

  @ApiProperty()
  stripe_id_price: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  details: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
