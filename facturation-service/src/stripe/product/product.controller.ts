import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StripeProductService } from './product.service';
import { StripeProductEntity } from './product.entity';

@Controller('stripe/product')
export class StripeProductController {
  constructor(private readonly stripeProductService: StripeProductService) {}

  @Get()
  test() {
    return 'yes';
  }

  @Post('create')
  ProductCreate(@Body() product: StripeProductEntity) {
    return this.stripeProductService.createProduct(product);
  }

  @Delete('delete:stripeProductId')
  productDelete(@Param('stripeProductId') stripeProductId: string) {
    return this.stripeProductService.deleteProduct(stripeProductId);
  }

  @Patch('update')
  productUpdate(@Body() product: StripeProductEntity) {
    return this.stripeProductService.updateProduct(product);
  }
}
