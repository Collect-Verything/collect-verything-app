# Definition des events Stripe

✅ Fonctionnel
❌ Non Fonctionnel


### checkout.session = Metadata, stock produit ✅
Utilité : Permet de confirmer la commande au client par mail grace à l'event stripe passé dans post man sur l'url :
POST MAN :http://localhost:2999/stripe/event

Bug : Lors de l'envoi d'un mail dans le cadre de l'achat d'un SERVICE/SUB, le mail est vide est ne contient pas la ref du produit acheté


### payment.intent = Facture - PRODUIT ✅
Utilité: Payment intent est une preuve de paiement, elle contient facture et montant payé autre information de facturation uniqquement concernant les PRODUITS.
POST MAN :http://localhost:2999/stripe/event

### invoice = Facture - SERVICE 
Utilité: Payment intent est une preuve de paiement de type subscription, elle contient facture et montant payé autre information de facturation uniquement concernant les SERVICE/ABONEMENT/SUBSCRIPTION.
POST MAN :http://localhost:2999/stripe/event



# Besoin

## Qu'est ce qu'un client a besoin lors d'un achat service/product

Nous allons repertorier les **EVENTS** qu'il est oblicatoire de traiter concernant un client ayant effectué un paiement concernant:

Produit :
-  checkout.session & payment_intent

Service:
-  checkout.session & invoice



