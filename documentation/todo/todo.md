← [Retourner au sommaire] [summary]

#### Visibilité :

La visibilité permet à un client d’accéder à l'URL officielle de son site web ou d'afficher un message de maintenance, par exemple.
Un site possède une URL de configuration, qui est invisible du public, ainsi qu'une URL publique accessible par n’importe qui.
Le client devrait pouvoir rendre son site non visible tout en ayant la possibilité de le consulter pour le configurer.
Il serait donc nécessaire d’ajouter un champ config_url dans le modèle, généré par exemple avec un UUID.
Cela signifie qu’un client posséderait techniquement deux URL, ce qui peut devenir compliqué.

La solution la plus simple, pour le moment, serait qu’un site, une fois rendu visible, reste toujours visible et non modifiable.
La visibilité d’un site pourrait être due à un client qui a choisi de ne pas continuer son abonnement, malgré l'alerte présente dans le tableau des abonnements.

N'oubliez pas de changer la création des produits atonement avec une récurrence annuelle.

A voire si la visibilité est vraiment pertinente ? Supprimer ...

### Api gateway
- POur le moment l'api gateway est un reverse proxy passe plat, il faut deplacer la logique aller retour du front dans l'api gate way
- Ameliorer la logique du free path, actuellement il accepte que auth/login et auth/register, il devra egalement accepter les evenenment stripe exterieur

### Deploy produit client
Deploiement automatique du site web du client, creer service deploy-service qui recoit un event rabbit mq certainement et qui deploi l'app ...

### Heberger
AWS EC2 ?

### Docker
Pull app on server and try to lunch it

### Kubernetes
Scaling sur l'api gateway

### Lint
Comprendre la problematique du lien suivant [issue_lint][issue_lint]

## Facturation
Fixer l'erreur quand liste facture est vide dans facturation/index.tsx



[summary]: ../README.md
[issue_lint]: ../development/linting.md
