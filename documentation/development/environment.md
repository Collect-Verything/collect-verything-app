# Environment


### Root

Un fichier .env est présent à la racine du mono-repo pour centraliser la gestion des ports et des URLs de tous les microservices. Cela permet de simplifier la configuration et les modifications au niveau de l'API Gateway, garantissant une gestion cohérente des connexions entre les différents services.

Chaque microservice dispose également de son propre fichier .env, qui contient uniquement l'URL de sa base de données. Cette configuration locale est spécifique à chaque microservice, car chaque conteneur utilise une base de données dédiée. Il n'est donc pas nécessaire de déplacer ces URLs, car elles sont conçues pour être indépendantes et propres à chaque service.