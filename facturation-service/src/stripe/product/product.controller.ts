import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { StripeProductService } from './product.service';
import { StripeProductEntity } from './product.entity';
import { STRIPE_URL } from '../const';

@Controller(`${STRIPE_URL}/product`)
export class StripeProductController {
  constructor(private readonly stripeProductService: StripeProductService) {}

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
