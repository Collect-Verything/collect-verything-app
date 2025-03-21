import { Subscription } from '@prisma/client';

export class SubscriptionEntity implements Subscription {
  id: number;
  user_stripe_id: string;
  sub_stripe_id: string;
  active_stripe: boolean;
  published: boolean;
  configured: boolean;
  current_period_end: number;
  current_period_start: number;
  createdAt: Date;
  updatedAt: Date;
}
