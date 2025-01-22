import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

@Injectable()
export class AppService {
  async createStripeCustomer(cleanedRegisterForm: User) {
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

  async createStripeSession(id_stripe: string, basket: any) {
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
}
