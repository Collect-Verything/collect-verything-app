import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ProductEntity } from './entities/product.entity';
import { User } from './entities/user.entity';

const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // INTENT
  @Get(':amount')
  async getIntent(@Param('amount', ParseIntPipe) amount: number) {
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return { client_secret: intent.client_secret };
  }

  // PRODUCT
  @Post('create')
  ProductCreate(@Body() product: ProductEntity) {
    return this.appService.createProduct(product);
  }

  @Delete('delete:stripeProductId')
  productDelete(@Param('stripeProductId') stripeProductId: string) {
    return this.appService.deleteProduct(stripeProductId);
  }

  @Patch('update')
  productUpdate(@Body() product: ProductEntity) {
    return this.appService.updateProduct(product);
  }

  // CUSTOMER
  @Post('create-customer')
  async customerCreate(@Body() cleanedRegisterForm: User) {
    const customer = await stripe.customers.create({
      email: cleanedRegisterForm.email,
      name: cleanedRegisterForm.lastname,
      phone: cleanedRegisterForm.phone,
      description: cleanedRegisterForm.id,
      shipping: {
        address: {
          city: '',
          country: '',
          line1: '',
          postal_code: '',
          state: '',
        },
        name: cleanedRegisterForm.lastname,
      },
      address: {
        city: '',
        country: '',
        line1: '',
        postal_code: '',
        state: '',
      },
    });
    return customer;
  }

  //   SESSION BASKET

  @Post('create-session/:id_stripe')
  async sessionCreate(
    @Param('id_stripe') id_stripe: string,
    @Body() basket: any,
  ) {
    const listRaw = [];

    const groupedItems = basket.reduce((acc, row) => {
      const stripe_id_price = row.product.stripe_id_price;
      if (!acc[stripe_id_price]) {
        acc[stripe_id_price] = { price: stripe_id_price, quantity: 0 };
      }
      acc[stripe_id_price].quantity += 1;
      return acc;
    }, {});

    for (const key in groupedItems) {
      listRaw.push(groupedItems[key]);
    }

    const session = await stripe.checkout.sessions.create({
      line_items: listRaw,
      customer: id_stripe,
      mode: 'subscription',
      ui_mode: 'embedded',
      return_url:
        'http://localhost:3000/checkout/return?session_id={CHECKOUT_SESSION_ID}',
    });

    return { clientSecret: session.client_secret };
  }

  //   EVENT
  // Dans un terminal:
  // stripe login
  // stripe listen --forward-to localhost:3003/event

  // Dans un autre
  // stripe trigger payment_intent.succeeded

  // Creer un module event
  // creer une abse de donnée pour sotcker les lien des facture de chaque client ...
  @Post('event')
  async eventGet(@Body() eventObject: any) {
    console.log(eventObject);
  }
}
