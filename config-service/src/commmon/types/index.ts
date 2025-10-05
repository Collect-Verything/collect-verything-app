import { ConfigurationEntity } from '../../configuration/entities/configuration.entity';
import { SubscriptionEntity } from '../../subscription/entities/subscription.entity';

export type MessageEntity = Omit<ConfigurationEntity, 'id' | 'subscriptionId'> &
  Omit<SubscriptionEntity, 'id' | 'createdAt' | 'updatedAt'>;
