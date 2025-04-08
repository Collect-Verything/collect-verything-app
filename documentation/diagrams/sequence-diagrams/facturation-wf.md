← [Retourner au sommaire] [summary]

# Facturation workflows


## Basket checking

- Lorsqu'un client souhaite valider son panier, il est possible que son user_stripe_id n'existe pas encore, notamment si c'est son premier achat. Dans ce cas, une première séquence de création sera effectuée.
- En revanche, si le client a déjà effectué un achat sur notre application, un user_stripe_id lui est fourni lors du login, et donc, au moment de valider le panier, la séquence mentionnée ci-dessus sera ignorée. Le processus passera directement à la facturation, comme décrit dans le point précédent.

```mermaid
    sequenceDiagram
    box Client
        participant Front App
    end
    box Door
        participant Api Gateway
    end
    box Private network
        participant Auth Service
        participant Facturation Service
    end
    box WWW
        participant STRIPE
    end
    Front App ->> Api Gateway : Request : Basket validation 
    Api Gateway -->> Auth Service : Request : Check Token
    Auth Service -->> Api Gateway : Response : Valid Token
    Api Gateway ->> Auth Service : Request : Get user informations
    Api Gateway ->> Front App : Response: User informations

    Front App ->> Api Gateway : Request : Create stripe User
    Api Gateway -->> Auth Service : Request : Check Token
    Auth Service -->> Api Gateway : Response : Valid Token
    Api Gateway ->> Facturation Service : Request : Transfer request to Stripe
    Facturation Service ->> STRIPE : Request : Create user Stripe
    STRIPE ->> Facturation Service : Response : Created user Stripe
    Facturation Service ->> Api Gateway: Response
    Api Gateway ->> Front App : Response: Info new stripe user
    Front App ->> Front App : Store: Update user store

    Front App ->> Api Gateway : Request : Update User in service db
    Api Gateway -->> Auth Service : Request : Check Token
    Auth Service -->> Api Gateway : Response : Valid Token
    Api Gateway ->> Auth Service : Request : Update user db with user_stripe_id
    Auth Service ->> Api Gateway : Response 
    Api Gateway ->> Front App : Response: Client updated
```

## Facturation

- Dans le diagramme précédent, nous avons constaté qu'avant d'effectuer un paiement, il est nécessaire de s'assurer que le client possède un user_stripe_id pour pouvoir effectuer le paiement et exister au sein de Stripe.
- Le contrôle se fait lors du clic sur la validation du panier. Une fois que le client possède un user_stripe_id — qu'il soit nouvellement créé ou déjà existant — la validation nous redirige vers le composant Stripe, l'EmbededCheckout.
- Ce composant représente un formulaire de paiement dans lequel le client pourra enregistrer ses informations bancaires et autres données nécessaires pour procéder au paiement.

Voici le déroulé...


```mermaid
    sequenceDiagram
    box Client
        participant Front App
    end
    box Door
        participant Api Gateway
    end
    box Private network
        participant Auth Service
        participant Facturation Service
    end
    box WWW
        participant STRIPE
        participant BANK API
    end

    Front App ->> Api Gateway : Request: Generate checkout
    Api Gateway -->> Auth Service : Request : Check Token
    Auth Service -->> Api Gateway : Response : Valid Token
    Api Gateway ->> Facturation Service : Request : Transfert ro Strip
    Facturation Service ->> STRIPE : Request : Create checkout
    STRIPE ->> Facturation Service : Response : Created user Stripe
    Facturation Service ->> Api Gateway: Response
    Api Gateway ->> Front App : Response: Display checkout payment form

    Front App ->> STRIPE : Request : Payment from user
    STRIPE -->> BANK API : Request : Transaction 
    BANK API -->> STRIPE : Response : Confirm Transaction 
    STRIPE ->> Front App  : Response : Confirm payment 
    STRIPE -->> Facturation Service  : EVENT : Generate invoice event
    Front App ->> Front App  : Display : Confirmation page
```

Comme précisé [ici][facturation-details], dans le titre Traitement des événements Stripe et persistance des factures, l'application n'étant pas encore en production, il est nécessaire, pour le moment, d'effectuer la persistance des factures via Postman afin de pouvoir consulter les factures.

[facturation-details]: ../../workflow/stripe/facturation.md
[summary]: ../../README.md
