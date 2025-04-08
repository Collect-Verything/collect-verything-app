← [Retourner au sommaire] [summary]

# Product workflows

## Creation, modification & suppression

- La création est effectuée par un utilisateur SUPER_ADMIN et, dans le futur, un super job de type PRODUCT sera également créé. 
- L'API Gateway n'étant pas encore implémentée, pour le moment, c'est le front qui effectue les aller-retour entre les services.

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
        participant Product Service
    end
    box WWW
        participant STRIPE
    end
    Front App ->> Api Gateway : Request
    Api Gateway -->> Auth Service : Request : Check Token
    Auth Service -->> Api Gateway : Response : Valide Token
    Api Gateway ->> Facturation Service : Request : Trig Stripe service
    Facturation Service ->> STRIPE : Request:  Create Product
    STRIPE ->> Facturation Service : Response: From Stripe
    Facturation Service ->> Api Gateway : Response: From service
    Api Gateway ->> Front App : Response: Created Product
    
    Front App ->> Api Gateway : Request
    Api Gateway -->> Auth Service : Request : Check Token
    Auth Service -->> Api Gateway : Response : Valide Token
    Api Gateway ->> Product Service : Request: Create Product
    Product Service ->> Api Gateway : Response: Create Product
    Api Gateway ->> Front App : Response: Create Product
```


[summary]: ../README.md
