← [Retourner au sommaire] [summary]


# Simulation d’un webhook Stripe « checkout.session »

### Contexte
Lorsqu’un client passe une commande (avec des produits gérés via Stripe Checkout), Stripe émet un événement webhook de type checkout.session.completed une fois le paiement validé. Cet événement contient toutes les informations de la session (produits, métadonnées, coordonnées client, etc.).

### Problématique
En développement local, votre application n’est pas déployée publiquement. L’API Gateway ne peut donc pas recevoir directement les webhooks Stripe. Il faut donc simuler manuellement l’appel à votre endpoint.

----

## Prérequis
### Accès au Dashboard Stripe

Grâce à Stripe CLI ou à l’interface web Stripe, vous devez pouvoir récupérer la charge utile JSON de l’événement checkout.session.completed.

### Outil de test HTTP

Postman, curl ou tout autre client capable d’envoyer une requête POST en JSON.

### Endpoint local

Votre API doit exposer un endpoint (ex. http://localhost:2999/stripe/event) capable de recevoir le webhook.


----

## Vérification des données
### Métadonnées (metadata) :
Contient les informations que vous avez ajoutées lors de la création de la session (références internes, IDs de panier, etc.).

### Données client (customer_details) :
Comprend le nom, l’adresse e-mail et l’adresse postale du client.

Vous pouvez inspecter ces champs dans votre contrôleur pour valider que la simulation fonctionne correctement.




```json
{
  "object": {
    "id": "cs_test_a1bHL8ELswPby1hR9DjkoEYhHiyzYTm1Ob8eVrAnnY8HHFfmOGQmcGVrd4",
    "object": "checkout.session",
    "adaptive_pricing": {
      "enabled": true
    },
    "after_expiration": null,
    "allow_promotion_codes": null,
    "amount_subtotal": 6900,
    "amount_total": 6900,
    "automatic_tax": {
      "enabled": false,
      "liability": null,
      "provider": null,
      "status": null
    },
    "billing_address_collection": null,
    "cancel_url": null,
    "client_reference_id": null,
    "client_secret": null,
    "collected_information": {
      "shipping_details": null
    },
    "consent": null,
    "consent_collection": null,
    "created": 1748710395,
    "currency": "eur",
    "currency_conversion": null,
    "custom_fields": [],
    "custom_text": {
      "after_submit": null,
      "shipping_address": null,
      "submit": null,
      "terms_of_service_acceptance": null
    },
    "customer": "cus_RnTtXDu5wUoTLf",
    "customer_creation": null,
    "customer_details": { // Ici
      "address": {
        "city": "",
        "country": "",
        "line1": "",
        "line2": null,
        "postal_code": "",
        "state": ""
      },
      "email": "admin@admin.fr",
      "name": "Cansell",
      "phone": null,
      "tax_exempt": "none",
      "tax_ids": []
    },
    "customer_email": null,
    "discounts": [],
    "expires_at": 1748796794,
    "invoice": null,
    "invoice_creation": {
      "enabled": false,
      "invoice_data": {
        "account_tax_ids": null,
        "custom_fields": null,
        "description": null,
        "footer": null,
        "issuer": null,
        "metadata": {},
        "rendering_options": null
      }
    },
    "livemode": false,
    "locale": null,
    "metadata": { // Ici
      "data": "{\"owner\":\"cus_RnTtXDu5wUoTLf\",\"products\":[{\"productName\":\"T shirt \",\"quantity\":3}],\"typeDelivery\":\"Point Relais\"}"
    },
    "mode": "payment",
    "payment_intent": "pi_3RUsf0K9Jv3tCgck0kq3PNJW",
    "payment_link": null,
    "payment_method_collection": "if_required",
    "payment_method_configuration_details": {
      "id": "pmc_1QYF94K9Jv3tCgckplUrNJ8n",
      "parent": null
    },
    "payment_method_options": {
      "card": {
        "request_three_d_secure": "automatic"
      }
    },
    "payment_method_types": [
      "card",
      "link"
    ],
    "payment_status": "paid",
    "permissions": null,
    "phone_number_collection": {
      "enabled": false
    },
    "recovered_from": null,
    "redirect_on_completion": "always",
    "return_url": "http://localhost:3000/payment-status",
    "saved_payment_method_options": {
      "allow_redisplay_filters": [
        "always"
      ],
      "payment_method_remove": "disabled",
      "payment_method_save": null
    },
    "setup_intent": null,
    "shipping": null,
    "shipping_address_collection": null,
    "shipping_options": [],
    "shipping_rate": null,
    "status": "complete",
    "submit_type": null,
    "subscription": null,
    "success_url": null,
    "total_details": {
      "amount_discount": 0,
      "amount_shipping": 0,
      "amount_tax": 0
    },
    "ui_mode": "embedded",
    "url": null,
    "wallet_options": null
  },
  "previous_attributes": null
}
```





























[summary]: ../../README.md
