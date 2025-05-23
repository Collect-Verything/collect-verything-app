import { Injectable } from '@nestjs/common';
import { StripeUserEntity } from './customer.entity';
import { configEnv } from '../../../env-config';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')(configEnv.STRIPE_API_KEY);

@Injectable()
export class StripeCustomerService {
  async create(cleanedRegisterForm: StripeUserEntity) {
    const actualClient = await stripe.customers.list();
    const clientAlreadyExist = actualClient.data.filter(
      (client) => client.email === cleanedRegisterForm.email
    );
    if (clientAlreadyExist.length > 0) {
      return clientAlreadyExist[0];
    } else {
      return await stripe.customers.create({
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
    }
  }
}
