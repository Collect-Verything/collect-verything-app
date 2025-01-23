import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

@Injectable()
export class StripeCheckoutService {
  async createCheckoutSession(id_stripe: string, basket: any) {
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
