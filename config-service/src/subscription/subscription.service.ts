import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageEntity } from '../commmon/types';

const stripe = require('stripe')(
  'sk_test_51SEAMVGWNF4aZ9vsUnjlaaMC0pu10eVlogq6C0y4w58y4hm9TL1yRwm9bA35D7qoQL7pCqNOkACxU7cD768gO0gd00VDz5ubzY'
);

// TODO :
//  Une solution inactive peut être réactivée via une facturation guidée, la subscription du
//  client sera donc remplacé et mise a jour avec les nouvelle info de la sub stripe, mais sera
//  toujours associé a la config originel et la visibilité sera intialisé a false et devra etre
//  reactivable par le client

/**
 * Service de gestion des abonnements Stripe.
 *
 * 🔍 **Gestion des abonnements expirés :**
 * Lorsqu'un abonnement arrive à échéance, il **disparaît** de la liste des abonnements
 * retournée par Stripe. Cette absence permet de **passer son statut à inactif**
 * dans la base et de proposer au client un renouvellement de contrat.
 */

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  /*
   * - `findAllByUserId(user_stripe_id: string)`:⚠️ // retourne uniquement les sub pour le moment
   * Récupère la liste des abonnements d'un utilisateur via Stripe,
   * les synchronise avec la base de données et retourne la liste mise à jour.
   */

  async findAllByUserId(user_stripe_id: string) {
    // const listSub = await stripe.subscriptions.list({
    //   customer: user_stripe_id,
    // });
    // await this.syncSubscriptions(user_stripe_id, listSub.data);
    return this.prisma.subscription.findMany({
      where: { user_stripe_id },
      include: { configuration: true },
    });
  }

  /*
   * - `syncSubscriptions(user_stripe_id: string, stripeSubs: any[])`:
   * - Compare les abonnements actifs fournis par Stripe avec ceux en base.
   * - Désactive les abonnements qui ont expiré (non présents dans la réponse Stripe).
   * - Ajoute les nouveaux abonnements et met à jour les existants.
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      })
    );
  }

  async cancelSubById(user_stripe_id: string) {
    await stripe.subscriptions.cancel(user_stripe_id);
    return this.prisma.subscription.update({
      where: { sub_stripe_id: user_stripe_id },
      data: { active_stripe: false, published: false },
    });
  }

  async recoverInactiveSubByUserId(user_stripe_id: string) {
    const subscriptions = await stripe.subscriptions.list({
      status: 'canceled',
      customer: user_stripe_id,
    });
    await this.syncSubscriptions(user_stripe_id, subscriptions.data);
  }

  async configureSubById(sub_id: string, is_active: boolean) {
    return this.prisma.subscription.update({
      where: { id: Number(sub_id) },
      data: {
        configured: Boolean(is_active),
      },
    });
  }

  async publishWebSite(sub_id: string, is_publish: boolean) {
    return this.prisma.subscription.update({
      where: { id: Number(sub_id) },
      data: {
        published: Boolean(is_publish),
      },
    });
  }

  async createWithConfiguration(data: MessageEntity) {
    return this.prisma.subscription.create({
      data: {
        user_stripe_id: data.user_stripe_id,
        sub_stripe_id: data.sub_stripe_id,
        active_stripe: data.active_stripe,
        published: data.published,
        configured: data.configured,
        current_period_end: Number(data.current_period_end),
        current_period_start: Number(data.current_period_start),
        configuration: {
          create: {
            url: data.url,
            brand_name: data.brand_name,
            admin_email: data.admin_email,
            website_type: data.website_type,
          },
        },
      },
      select: {
        id: true,
        configuration: { select: { id: true } },
      },
    });
  }
}
