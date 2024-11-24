import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  picture_path;

  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  details: string;

  @ApiProperty({ enum: ['SERVICE', 'PRODUCT']})
  type: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  price: number;

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
