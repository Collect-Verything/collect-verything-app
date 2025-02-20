import { Injectable } from '@nestjs/common';

// npm install stripe --save
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

// TODO : Mettre clé stripe dans .env

@Injectable()
export class SubscriptionService {
  async findAllByUserId(user_stripe_id: string) {
    const listSub = await stripe.subscriptions.list({
      customer: user_stripe_id,
    });

    await this.upsertSubscriptionsByUserId(user_stripe_id, listSub);

    return listSub
  }

  async upsertSubscriptionsByUserId(user_stripe_id: string,listSub: any){
    // map on listSub upsert sur listSub.id unique
    console.log(user_stripe_id);
    console.log(listSub);
  }
}
