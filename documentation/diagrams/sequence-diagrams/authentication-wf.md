← [Retourner au sommaire] [summary]

# Authentication workflows  

## Register 

(Branche en cours de developpement au niveau de l'implementation AMQP: mette a jour quand terminé)

```mermaid
    sequenceDiagram
    box  Client
        participant Front App
    end
    box  Door
        participant Api Gateway
    end
    box Private network
        participant Auth Service
        participant Mail Service
    end
    box SMTP WWW
        participant USER MAIL
    end
    Front App->>Api Gateway: Request: Register
    Api Gateway->>Auth Service : Request: Create User
    Auth Service-->>Mail Service : AMQP: Create User
    Mail Service-->>USER MAIL : SMTP: Request
    Auth Service->>Api Gateway : Response: Create User
    Api Gateway->>Front App : Response: Register
```

## Login
```mermaid
    sequenceDiagram
    box  Client
        participant Front App
    end
    box  Door
        participant Api Gateway
    end
    box Private network
        participant Auth Service
    end
    Front App->>Api Gateway: Request: Login
    Api Gateway->>Auth Service : Request: Login User
    Auth Service->>Api Gateway : Response: Login User
    Api Gateway->>Front App : Response: Login
```

## Forgot password

(Branche en cours de developpement au niveau de l'implementation AMQP: mette a jour quand terminé)

```mermaid
    sequenceDiagram
    box  Client
        participant Front App
    end
    box  Door
        participant Api Gateway
    end
    box Private network
        participant Auth Service
        participant Mail Service
    end
    box SMTP WWW
        participant User Mail
    end
    Front App->>Api Gateway: Request: Forgot Password
    Api Gateway->>Auth Service : Request: Generate Password
    Auth Service-->>Mail Service : AMQP: Generate link
    Mail Service-->>User Mail : SMTP: Request 
    Auth Service->>Api Gateway : Response: Generate Password
    Api Gateway->>Front App : Response: Forgot Password
    User Mail-->>Front App : Request: Link password 
```


[summary]: ../../README.md
