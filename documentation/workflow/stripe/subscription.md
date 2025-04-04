← [Retourner au sommaire] [summary]

# Subscription : 
### Config Service

Les subscriptions dans Stripe représentent un abonnement à un produit avec une date de souscription et une date de fin de validité. Lorsqu'un abonnement est renouvelé, une nouvelle facture est générée, et l'objet subscription voit sa date de fin de validité prolongée.

Nous allons persister cette subscription dans notre base de données. Cela nous permettra de déterminer quels sites sont en ligne ou hors ligne, en fonction de la validité de l'abonnement.

### Règle actuelle :
Un site hors ligne est un site dont la validité est inférieure à T (T étant la date actuelle).

## Workflow de récupération des abonnements d'un utilisateur :
Un utilisateur accède à la page "Configuration et Solutions".
Une requête est envoyée à notre serveur.
Le serveur interroge Stripe pour récupérer toutes les subscriptions liées à l'utilisateur.
Si des nouvelles subscriptions sont détectées, elles sont persistées dans notre base de données.
Le serveur retourne les données au client, qui les affiche sous forme de tableau.
L'utilisateur peut alors consulter ses solutions actives (en ligne) et celles désactivées (hors ligne) en fonction du statut de paiement ou d'un statut défini manuellement.


[summary]: ../README.md
