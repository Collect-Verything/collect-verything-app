import { Injectable } from '@nestjs/common';
import { StripeProductEntity } from './product.entity';

const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

@Injectable()
export class StripeProductService {
  createProduct(product: StripeProductEntity) {
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

  async updateProduct(product: StripeProductEntity) {
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
