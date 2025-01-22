import { Injectable } from '@nestjs/common';
import { StripeUserEntity } from './customer.entity';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

@Injectable()
export class StripeCustomerService {
  async create(cleanedRegisterForm: StripeUserEntity) {
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
}
