import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

// TODO : Attention pour le moment nous pouvon seulement acheter des produits ou alors des service mais pas les deux en meme temp
// TODO : Trouver le moyen d'acheter des produits et des service abonement en meme temp,
// TODO : Recuperer facture en cas de paiement, ou alors associer l'envoie de facture au mail du client pour ne gerer que les facture abonement service dans l'app , avoire ...

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
      // 'http://localhost:3000/payment-status?session_id={CHECKOUT_SESSION_ID}',
    });

    return { clientSecret: session.client_secret };
  }
}
