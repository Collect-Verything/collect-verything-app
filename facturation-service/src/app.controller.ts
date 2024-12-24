import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {ProductEntity} from "./entities/user.entity";

const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":amount")
  async getIntent(@Param('amount', ParseIntPipe) amount: number) {
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    })
    return { client_secret: intent.client_secret };
  }

    @Post("create")
    create(@Body() product: ProductEntity) {
        return this.appService.createProduct(product);
    }

}




