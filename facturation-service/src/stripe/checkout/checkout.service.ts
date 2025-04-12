import { Injectable } from '@nestjs/common';
import { configEnv } from '../../../env-config';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')(configEnv.STRIPE_API_KEY);

@Injectable()
export class StripeCheckoutService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createCheckoutSession(id_stripe: string, basket: any) {
    const listRaw = [];

    let productType = 'SERVICE';

    if (basket[0].product.type === 'PRODUCT') {
      productType = 'PRODUCT';
    }

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
      mode: productType === 'PRODUCT' ? 'payment' : 'subscription',
      ui_mode: 'embedded',
      return_url: 'http://localhost:3000/payment-status',
    });

    return { clientSecret: session.client_secret };
  }
}
