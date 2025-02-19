import { Injectable } from '@nestjs/common';

// npm install stripe --save
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

// TODO : Mettre clé stripe dans .env

@Injectable()
export class SubscriptionService {
  async findAll() {
    return await stripe.subscriptions.list({
      customer: "cus_RmzpxFcuDJqenR",
    });
  }
}
