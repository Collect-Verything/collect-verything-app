import { Injectable } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { User } from './entities/user.entity';

const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

@Injectable()
export class AppService {
  createProduct(product: ProductEntity) {
    return stripe.products.create({
      name: String(product.name),
      default_price_data: {
        unit_amount_decimal: product.price * 100,
        currency: 'eur',
        ...(product.type === 'SERVICE' && {
          recurring: {
            interval: 'month',
          },
        }),
      },
      expand: ['default_price'],
    });
  }

  deleteProduct(stripeProductId: string) {
    stripe.products.delete(stripeProductId);
  }

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

  /*
   * Dans l'API de Stripe, les objets Price sont immuables pour ce qui est de leur montant (unit_amount). Cela signifie qu'une fois qu'un prix a été créé, vous ne pouvez pas le modifier directement.
   * Stripe recommande de créer un nouveau prix si vous avez besoin de mettre à jour le montant.
   * Le but est de garder en memoire un prix different pour un meme article dans le cas ou un client aurait payé un rix different dans le passé par exemple
   * */

  async updateProduct(product: ProductEntity) {
    try {
      const newPrice = await stripe.prices.create({
        unit_amount: product.price * 100,
        currency: 'eur',
        product: product.stripe_id,
        ...(product.type === 'SERVICE' && {
          recurring: {
            interval: 'month',
          },
        }),
      });

      if (!newPrice || !newPrice.id) {
        throw new Error('Échec de la création du prix : ID non défini');
      }

      await stripe.products.update(product.stripe_id, {
        default_price: newPrice.id,
        name: product.name,
      });

      product.stripe_id_price = newPrice.id;

      return product;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);
      throw new Error(
        'Une erreur est survenue lors de la mise à jour du produit.',
      );
    }
  }
}
