← [Retourner au sommaire] [summary]

## Build image and run container:

### (old)Front application 
(checker historique commit pour l'ancienne config)

```
cd front-app
docker build . -t front-app
docker run --name front-app -d -p 3000:3000 front-app
```

### Authentication service 

```
cd auth-service
docker build . -t auth-service
docker run --name auth-service -d -p 3001:3001 auth-service
```


## (new)Run all app


Delete old containers if already create and run this commande in root folder :
```
// cd in choosing app
docker compose up
```

Check your local host on 3000 & 3001


# Docker Hub

Images of all app are available with

```
docker image pull cansefr/front-app
docker image pull cansefr/api-gateway
docker image pull cansefr/auth-service
docker image pull cansefr/config-service
docker image pull cansefr/facturation-service
docker image pull cansefr/product-service
```

# Issue
Actuellement depuis mon mac j'ai cette alerte

```error
no matching manifest for linux/arm64/v8 in the manifest list entries
```

J'arrive a pull avec ces commandes

```
docker container run --platform linux/amd64 cansefr/front-app
docker container run --platform linux/amd64 cansefr/auth-service
```

Mais il faut fixer ce probleme ... (TODO) 

[summary]: ../README.md
