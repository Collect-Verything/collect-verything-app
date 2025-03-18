## Next:
- Dialog config une fois validé permet de deployer le site web

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
### Deploy produit client
### Heberger, docker
### Kubernetes


## Fix error terminal au lancement:
```
Files successfully emitted, waiting for typecheck results...
Issues checking in progress...
[Nest] 4030  - 03/18/2025, 6:18:56 PM   ERROR [ExceptionsHandler] No such customer: 'undefined'
Error: No such customer: 'undefined'
    at generateV1Error (/Users/canse/Documents/M2I/Apps-Projet-M2I/collect-verything-app/config-service/node_modules/stripe/cjs/Error.js:11:20)
    at res.toJSON.then.Error_js_1.StripeAPIError.message (/Users/canse/Documents/M2I/Apps-Projet-M2I/collect-verything-app/config-service/node_modules/stripe/cjs/RequestSender.js:108:62)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
No issues found.
```
