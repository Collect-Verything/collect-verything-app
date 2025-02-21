import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// npm install stripe --save
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')('sk_test_VfGNimRoo2iCC7QIRyKnY3sc');

// TODO : Mettre clé stripe dans .env

//  Une subscription devenue inactive, dont le paiement n'est pas renouvellé n'est plus presente dans la liste de sub renvoyé par stripe
// La subscription etant persisté dans notre base nous permet de noter la derniere date de current_period_end, ou alors de ce baser sur le parametre active de lobecjt sub

// Client souhaite reactiver une solution qui n'st plus active/en cours de subscription
// Faire une dif entre la liste persisité et la liste get => Permet de savoir quel solution n'est plus active
//Une solution plus active peux etre reactivable via une nouvelle facturation "guidé" => cette nouvelle transaction guidé permettra de remplacer l'id subscription de lancienne solution pkus active et recuperera la configuration precedente

// Stocker l'id de l'ancienne subscription ?
@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async findAllByUserId(user_stripe_id: string) {
    const listSub = await stripe.subscriptions.list({
      customer: user_stripe_id,
    });
    await this.syncSubscriptions(user_stripe_id, listSub.data);
    return this.prisma.subscription.findMany({ where: { user_stripe_id } });
  }

  async syncSubscriptions(user_stripe_id: string, stripeSubs: any[]) {

    const stripeSubIds = stripeSubs.map((sub) => sub.id);

    await this.prisma.subscription.updateMany({
      where: {
        user_stripe_id,
        sub_stripe_id: { notIn: stripeSubIds },
      },
      data: {
        active_stripe: false,
      },
    });

    await Promise.all(
      stripeSubs.map(async (sub: any) => {
        await this.prisma.subscription.upsert({
          where: { sub_stripe_id: sub.id },
          update: {
            active_stripe: sub.status === 'active',
            current_period_start: sub.current_period_start,
            current_period_end: sub.current_period_end,
          },
          create: {
            user_stripe_id: user_stripe_id,
            sub_stripe_id: sub.id,
            active_stripe: true,
            current_period_start: sub.current_period_start,
            current_period_end: sub.current_period_end,
          },
        });
      }),
    );
  }
}
