← [Retourner au sommaire] [summary]

# Message Broker

## RabbitMQ

RabbitMQ est le message broker utilisé pour cette application. Il est possible d'accéder à son interface d'administration via l'URL suivante :

Url : http://localhost:15672/#/

Avec les identifiants suivants:

```yaml
user: guest
password: guest
```

Si vous souhaitez personnaliser ces identifiants, il suffit de modifier le docker compose

```yaml
environment:
  RABBITMQ_DEFAULT_USER: admin
  RABBITMQ_DEFAULT_PASS: supersecret
```

[summary]: ../README.md
