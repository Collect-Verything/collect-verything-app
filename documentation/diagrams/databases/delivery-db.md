← [Retourner au sommaire] [summary]

# Delivery Database

La base de données Delivery-Service gère l’enregistrement et le suivi de tous les événements de livraison de commandes. Elle doit pouvoir traiter deux scénarios principaux :

Livraison en point relais : simple notification pour indiquer qu’une commande est disponible en point relais pour un client et les produits concernés.

Livraison en magasin : persistance de la commande (produits, quantités) avec suivi du statut de livraison au client.


```mermaid
---
title: Delivery Database
---
classDiagram
    Delivery <|-- User
    Delivery <|-- Product

    class DeliveryStatus {
        <<enumeration>>
        Pending
        Partial
        Done
    }

    class DeliveryType {
        <<enumeration>>
        Shop
        Point_Relais
    }

    class Delivery {
        int id
        DeliveryStatus status
        DeliveryType statypeus
        varchar(500) info
        datetime(3) createdAt
        datetime(3) updatedAt
    }

    class User {
        int id
        varchar(191) owner
        varchar(191) name
        varchar(191) email
        datetime(3) createdAt
        datetime(3) updatedAt
    }

    class Product {
        int id
        varchar(191) name
        int quantity
        datetime(3) createdAt
        datetime(3) updatedAt
    }

```


[summary]: ../../README.md
