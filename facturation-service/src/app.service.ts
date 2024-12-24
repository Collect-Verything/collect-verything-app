import { Injectable } from '@nestjs/common';
import {ProductEntity} from "./entities/user.entity";

const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

@Injectable()
export class AppService {
  createProduct(product: ProductEntity) {
    stripe.products.create({
      name: String(product.name),
      default_price_data: {
        unit_amount_decimal: product.price,
        currency: 'eur',
        ...(product.type === "SERVICE" && {
          recurring: {
            interval: 'month',
          },
        }),
      },
      expand: ['default_price'],
    });
  }
}
