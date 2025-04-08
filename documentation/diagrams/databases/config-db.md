← [Retourner au sommaire] [summary]


# Configuration Database

Le service de configuration est d'abord représenté par une souscription, puis une souscription peut ensuite être configurée.

```mermaid
classDiagram
  direction BT
  class Configuration {
    int subscriptionId
    varchar(191) url
    varchar(191) brand_name
    varchar(191) admin_email
    varchar(191) website_type
    int id
  }
  class Subscription {
    varchar(191) user_stripe_id
    varchar(191) sub_stripe_id
    tinyint(1) active_stripe
    tinyint(1) published
    tinyint(1) configured
    int current_period_end
    int current_period_start
    datetime(3) createdAt
    datetime(3) updatedAt
    int id
  }
  Configuration --* Subscription : subscriptionId-id


```


[summary]: ../../README.md
