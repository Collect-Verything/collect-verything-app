← [Retourner au sommaire] [summary]

# Application

```mermaid
flowchart LR
%% Zone client
    subgraph Client
        front[Front-App]
    end

%% Zone Docker network
    subgraph Docker_Network[Docker Network]
        gate[API Gateway]
    %% Sous-zone : réseau privé
        subgraph Private_Network[Private Network]
            facture[Facturation Service]
            facture-db[(Facture Database)]

            auth[Auth Service]
            auth-db[(Auth Database)]

            config[Config Service]
            config-db[(Config Database)]

            product[Product Service]
            product-db[(Product Database)]

            facturation[Facturation Service]
            facturation-db[(Facturation Database)]

            delivery[Delivery Service]
            delivery-db[(Delivery Database)]

            mail[Mail Service]
            amqp{{RabbitMQ}}
        end

    end

%% Zone WWW
    subgraph www[World Wide Web]
        Stripe
        Bank
        SMTP
    end

%% Connexions
    front <--> gate

    gate <--> auth
    auth <-.-> auth-db

    gate <--> facture
    facture <-.-> facture-db

    gate <--> config
    config <-.-> config-db

    gate <--> product
    product <-.-> product-db

    gate <--> facturation
    facturation <-.-> facturation-db

    gate <--> delivery
    delivery <-.-> delivery-db

    auth -.- amqp
    amqp -.- mail
    mail <-.-> SMTP

    Private_Network <-.-> Stripe
    Stripe <-.-> Bank
```

- Le réseau privé (Private Network) a été relié à l'API de Stripe, plutôt que de représenter une connexion individuelle depuis chaque service.
- Tous les autre service qui communique avec le message broker n'ont pas etait representé pour des question de lisibilité mais sont consultable dans workflow/stripe/events

[summary]: ../../README.md
