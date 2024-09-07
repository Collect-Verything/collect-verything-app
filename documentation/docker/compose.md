## Build image and run container:

### (old)Front application 
(checker historique commit pour l'ancienne config)

```
cd front-app
docker build . -t front-app
docker run --name front-app -d -p 81:3000 front-app
```

### Authentication service 

```
cd auth-service
docker build . -t auth-service
docker run --name auth-service -d -p 82:3001 auth-service
```


## (new)Run both app


Delete old containers if already create and run this commande in root folder :
```
docker compose up
```

Check your local host on 3000 & 3001 


# Error amd

lancer les container avec les flag suivant 
```
docker container run --platform linux/amd64 cansefr/front-app
docker container run --platform linux/amd64 cansefr/auth-service
```


# Pull & Run from Docker Hub

```
docker image pull cansefr/front-app
docker image pull cansefr/auth-service
docker run cansefr/front-app
docker run cansefr/auth-service
```