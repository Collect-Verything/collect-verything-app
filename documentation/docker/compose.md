## Build image and run container:

### Front application

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


## Run both app

Delete old containers if already create and run this commande in root folder :
```
docker-compose-up
```

Check your local host on 3000 & 3001 