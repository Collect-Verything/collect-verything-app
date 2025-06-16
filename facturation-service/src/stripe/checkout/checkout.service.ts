import { Injectable } from '@nestjs/common';
import { configEnv } from '../../../env-config';

const stripe = require('stripe')(configEnv.STRIPE_API_KEY);

@Injectable()
export class StripeCheckoutService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createCheckoutSession(id_stripe: string, basket: any) {
    console.log(basket);
    const listRaw = [];

    let productType = 'SERVICE';

    if (basket.listBasket[0].product.type === 'PRODUCT') {
      productType = 'PRODUCT';
    }

    const groupedItems = basket.listBasket.reduce((acc, row) => {
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

    const productList = basket.listBasket.filter((item) => item.product.type === 'PRODUCT');

    const obj: DeliveryObject = {
      owner: id_stripe,
      products: [],
      typeDelivery: basket.delivery,
    };

    for (const item of productList) {
      const existing = obj.products.find((p) => p.productName === item.product.name);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        obj.products.push({
          productName: item.product.name,
          quantity: item.quantity,
        });
      }
    }

    // Info, la liste des produits sont passé dans metadata avec le type de livraison
    // Recuperer l'evenement "checkout.session.completed", puis le Postman pour persister la livraison, fix quand app en prod

    const session = await stripe.checkout.sessions.create({
      line_items: listRaw,
      customer: id_stripe,
      mode: productType === 'PRODUCT' ? 'payment' : 'subscription',
      ui_mode: 'embedded',
      return_url: 'http://localhost:3000/payment-status',
      metadata: { data: JSON.stringify(obj) },
    });

    return { clientSecret: session.client_secret };
  }
}

interface DeliveryProduct {
  productName: string;
  quantity: number;
}

interface DeliveryObject {
  owner: string;
  products: DeliveryProduct[];
  typeDelivery: 'Magasin' | 'Point_Relais';
}
