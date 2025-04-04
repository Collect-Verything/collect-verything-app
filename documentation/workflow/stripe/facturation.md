← [Retourner au sommaire] [summary]


# Workflow Produit Facturation
Lors du seed de l'application, un client ou un produit créé initialement n'est pas reconnu par Stripe. Pour garantir la cohérence des interactions commerciales, toutes les opérations effectuées sur l'application doivent être synchronisées avec Stripe.

## 1️⃣ Création d'un produit sur Stripe
Pour initier un workflow commercial, Stripe doit connaître à la fois le produit et le client. Voici le processus à suivre :

- Se connecter en Super Admin sur l'application.
- Créer un service/produit via l'interface produit admin. 
- Lors de la création, une requête API est envoyée à Stripe pour créer le produit sur Stripe puis dans notre propre base de données.

## 2️⃣ Création et identification d’un client sur Stripe
Un client nouvellement inscrit n'a pas encore d'user_stripe_id. Pour le vérifier, il suffit de consulter la base de données.
L'obtention d’un user_stripe_id est automatisée lors du premier paiement :

Si le client a déjà un user_stripe_id, cliquer sur "Payer" le redirige directement vers le formulaire de paiement embarqué généré par Stripe.
Si le client n’a pas encore de user_stripe_id, cliquer sur "Payer" execute une requête de création de user à Stripe, l’identifiant est ensuite persisté dans notre base, et le client est alors reconnu par Stripe. Le formulaire de paiement embarqué généré par Stripe va donc s'afficher.

## 3️⃣ Paiement d’un produit avec une carte de test
Le paiement s’effectue avec une carte de test fournie par Stripe.
💳 Carte test recommandée : 4242 4242 4242 4242
Les autres informations (date, CVC) peuvent être improvisées et validées. ( [Documentation Carte] [Documentation Carte])      

(Consulter diagrame sequence): Mettre le lien ici quand documentaaion terminé

## 4️⃣ Traitement des événements Stripe et persistance des factures
Lorsqu'un paiement est validé, Stripe génère des événements visibles sur Stripe Dashboard > Développeur > [Event] [Event] :    

- 🛒 payment_intent.succeeded → Généré lors d’un paiement de produit.
- 📄 invoice.payment_succeeded → Généré pour une facture de service.

🚀 Comme l'application n'est pas encore en production, il faut copier-coller ces événements et les envoyer manuellement via Postman au service de facturation.
Ce dernier écoute l'événement, traite la requête et persiste la facture, permettant ainsi au client de la consulter dans son espace personnel.

Quand l'application sera en production, il sera possible de renseigner l'URL du serveur dans l'onglet Webhook de Stripe et d'automatiser toutes ces démarches.

## 5️⃣ Event object

Les événements à copier dans Postman doivent être envoyés à l'URL suivante : 
- http://localhost:3003/stripe/event/ : Pour une appli NON dockerisé
- http://api-gateway:3003/stripe/event/ : Pour une appli dockerisé

Voici à quoi ressemblent les objets d'événements traités au sein de l'application pour le moment :

Lors de l'achat d'un service Stripe nous genere un evenement de type *invoice.payment_succeeded* que l'on peut voir ci dessous, c'est cette object qui doit etre envoyé via *POSTMAN*

```json
 {
   "object": {
   "id": "in_1QtTjIK9Jv3tCgckowyNZKWV",
       "object": "invoice",
       "account_country": "FR",
       "account_name": "Autumn Mood",
       "account_tax_ids": null,
       "amount_due": 1100,
       "amount_paid": 1100,
       "amount_remaining": 0,
       "amount_shipping": 0,
       "application": null,
       "application_fee": null,
       "attempt_count": 1,
       "attempted": true,
       "auto_advance": false,
       "automatic_tax": {
     "disabled_reason": null,
         "enabled": false,
         "liability": null,
         "status": null
   },
   "automatically_finalizes_at": null,
       "billing": "charge_automatically",
       "billing_reason": "subscription_update",
       "charge": "ch_3QtTjJK9Jv3tCgck1kazeeTN",
       "closed": true,
       "collection_method": "charge_automatically",
       "created": 1739796440,
       "currency": "eur",
       "custom_fields": null,
       "customer": "cus_RmzpxFcuDJqenR",
       "customer_address": {
     "city": "",
         "country": "",
         "line1": "",
         "line2": null,
         "postal_code": "",
         "state": ""
   },
   "customer_email": "Dacia@gmail.com",
       "customer_name": "Renault",
       "customer_phone": "1234567890",
       "customer_shipping": {
     "address": {
       "city": "",
           "country": "",
           "line1": "",
           "line2": null,
           "postal_code": "",
           "state": ""
     },
     "name": "Renault",
         "phone": null
   },
   "customer_tax_exempt": "none",
       "customer_tax_ids": [],
       "date": 1739796440,
       "default_payment_method": null,
       "default_source": null,
       "default_tax_rates": [],
       "description": null,
       "discount": null,
       "discounts": [],
       "due_date": null,
       "effective_at": 1739796440,
       "ending_balance": 0,
       "finalized_at": 1739796440,
       "footer": null,
       "forgiven": false,
       "from_invoice": null,
       "hosted_invoice_url": "https://invoice.stripe.com/i/acct_1BscbLK9Jv3tCgck/test_YWNjdF8xQnNjYkxLOUp2M3RDZ2NrLF9SbjNyeFZnc3hsVVNPSVVrbnBnODV4Rm1sR0xaRzJkLDEzMDMzNzI0NA0200ulaEI2UZ?s=ap",
       "invoice_pdf": "https://pay.stripe.com/invoice/acct_1BscbLK9Jv3tCgck/test_YWNjdF8xQnNjYkxLOUp2M3RDZ2NrLF9SbjNyeFZnc3hsVVNPSVVrbnBnODV4Rm1sR0xaRzJkLDEzMDMzNzI0NA0200ulaEI2UZ/pdf?s=ap",
       "issuer": {
     "type": "self"
   },
   "last_finalization_error": null,
       "latest_revision": null,
       "lines": {
     "object": "list",
         "data": [
       {
         "id": "sub_1QtTjIK9Jv3tCgckBlA3gDyO",
         "object": "line_item",
         "amount": 1100,
         "amount_excluding_tax": 1100,
         "currency": "eur",
         "description": "1 × Prod1 (at €11.00 / month)",
         "discount_amounts": [],
         "discountable": true,
         "discounts": [],
         "invoice": "in_1QtTjIK9Jv3tCgckowyNZKWV",
         "livemode": false,
         "metadata": {},
         "period": {
           "end": 1742215640,
           "start": 1739796440
         },
         "plan": {
           "id": "price_1QsJxZK9Jv3tCgckzFsSi7pZ",
           "object": "plan",
           "active": true,
           "aggregate_usage": null,
           "amount": 1100,
           "amount_decimal": "1100",
           "billing_scheme": "per_unit",
           "created": 1739520557,
           "currency": "eur",
           "interval": "month",
           "interval_count": 1,
           "livemode": false,
           "metadata": {},
           "meter": null,
           "nickname": null,
           "product": "prod_RlrgAJQoKHFtZF",
           "tiers": null,
           "tiers_mode": null,
           "transform_usage": null,
           "trial_period_days": null,
           "usage_type": "licensed"
         },
         "pretax_credit_amounts": [],
         "price": {
           "id": "price_1QsJxZK9Jv3tCgckzFsSi7pZ",
           "object": "price",
           "active": true,
           "billing_scheme": "per_unit",
           "created": 1739520557,
           "currency": "eur",
           "custom_unit_amount": null,
           "livemode": false,
           "lookup_key": null,
           "metadata": {},
           "nickname": null,
           "product": "prod_RlrgAJQoKHFtZF",
           "recurring": {
             "aggregate_usage": null,
             "interval": "month",
             "interval_count": 1,
             "meter": null,
             "trial_period_days": null,
             "usage_type": "licensed"
           },
           "tax_behavior": "unspecified",
           "tiers_mode": null,
           "transform_quantity": null,
           "type": "recurring",
           "unit_amount": 1100,
           "unit_amount_decimal": "1100"
         },
         "proration": false,
         "proration_details": {
           "credited_items": null
         },
         "quantity": 1,
         "subscription": null,
         "subscription_item": "si_Rn3rHWw4irvW5p",
         "tax_amounts": [],
         "tax_rates": [],
         "type": "subscription",
         "unique_id": "il_1QtTjIK9Jv3tCgckfgSmezPY",
         "unique_line_item_id": "sli_14b72bK9Jv3tCgck0b201228",
         "unit_amount_excluding_tax": "1100"
       }
     ],
         "has_more": false,
         "total_count": 1,
         "url": "/v1/invoices/in_1QtTjIK9Jv3tCgckowyNZKWV/lines"
   },
   "livemode": false,
       "metadata": {},
   "next_payment_attempt": null,
       "number": "0073FD4D-0002",
       "on_behalf_of": null,
       "paid": true,
       "paid_out_of_band": false,
       "payment_intent": "pi_3QtTjJK9Jv3tCgck1XpGHxQK",
       "payment_settings": {
     "default_mandate": null,
         "payment_method_options": {
       "acss_debit": null,
           "bancontact": null,
           "card": {
         "request_three_d_secure": "automatic"
       },
       "customer_balance": null,
           "konbini": null,
           "sepa_debit": null,
           "us_bank_account": null
     },
     "payment_method_types": null
   },
   "period_end": 1739796440,
       "period_start": 1739796440,
       "post_payment_credit_notes_amount": 0,
       "pre_payment_credit_notes_amount": 0,
       "quote": null,
       "receipt_number": null,
       "rendering": null,
       "rendering_options": null,
       "shipping_cost": null,
       "shipping_details": null,
       "starting_balance": 0,
       "statement_descriptor": null,
       "status": "paid",
       "status_transitions": {
     "finalized_at": 1739796440,
         "marked_uncollectible_at": null,
         "paid_at": 1739796442,
         "voided_at": null
   },
   "subscription": "sub_1QtTjIK9Jv3tCgckBlA3gDyO",
       "subscription_details": {
     "metadata": {}
   },
   "subtotal": 1100,
       "subtotal_excluding_tax": 1100,
       "tax": null,
       "tax_percent": null,
       "test_clock": null,
       "total": 1100,
       "total_discount_amounts": [],
       "total_excluding_tax": 1100,
       "total_pretax_credit_amounts": [],
       "total_tax_amounts": [],
       "transfer_data": null,
       "webhooks_delivered_at": null
 },
   "previous_attributes": null
 }
```

- Lors de l'achat d'un produit, l'événement payment_intent.succeeded est généré.

```json
{
  "object": {
    "id": "pi_3Qu87qK9Jv3tCgck1WB6Pi6g",
    "object": "payment_intent",
    "allowed_source_types": [
      "card"
    ],
    "amount": 2200,
    "amount_capturable": 0,
    "amount_details": {
      "tip": {}
    },
    "amount_received": 2200,
    "application": null,
    "application_fee_amount": null,
    "automatic_payment_methods": null,
    "canceled_at": null,
    "cancellation_reason": null,
    "capture_method": "automatic_async",
    "charges": {
      "object": "list",
      "data": [
        {
          "id": "ch_3Qu87qK9Jv3tCgck1JKuQwfb",
          "object": "charge",
          "amount": 2200,
          "amount_captured": 2200,
          "amount_refunded": 0,
          "application": null,
          "application_fee": null,
          "application_fee_amount": null,
          "balance_transaction": null,
          "billing_details": {
            "address": {
              "city": null,
              "country": "FR",
              "line1": null,
              "line2": null,
              "postal_code": null,
              "state": null
            },
            "email": "plz@gmail.com",
            "name": "AZEzd",
            "phone": null
          },
          "calculated_statement_descriptor": "WEAR, BLOG & LIFE STYL",
          "captured": true,
          "created": 1739951722,
          "currency": "eur",
          "customer": "cus_RnjaABLpoZ1y5t",
          "description": null,
          "destination": null,
          "dispute": null,
          "disputed": false,
          "failure_balance_transaction": null,
          "failure_code": null,
          "failure_message": null,
          "fraud_details": {},
          "invoice": null,
          "livemode": false,
          "metadata": {},
          "on_behalf_of": null,
          "order": null,
          "outcome": {
            "advice_code": null,
            "network_advice_code": null,
            "network_decline_code": null,
            "network_status": "approved_by_network",
            "reason": null,
            "risk_level": "normal",
            "risk_score": 36,
            "seller_message": "Payment complete.",
            "type": "authorized"
          },
          "paid": true,
          "payment_intent": "pi_3Qu87qK9Jv3tCgck1WB6Pi6g",
          "payment_method": "pm_1Qu87pK9Jv3tCgckfILNOzQo",
          "payment_method_details": {
            "card": {
              "amount_authorized": 2200,
              "authorization_code": null,
              "brand": "visa",
              "checks": {
                "address_line1_check": null,
                "address_postal_code_check": null,
                "cvc_check": "pass"
              },
              "country": "US",
              "exp_month": 12,
              "exp_year": 2026,
              "extended_authorization": {
                "status": "disabled"
              },
              "fingerprint": "XcVO8v4LGkayK9hN",
              "funding": "credit",
              "incremental_authorization": {
                "status": "unavailable"
              },
              "installments": null,
              "last4": "4242",
              "mandate": null,
              "multicapture": {
                "status": "unavailable"
              },
              "network": "visa",
              "network_token": {
                "used": false
              },
              "network_transaction_id": "889986795611852",
              "overcapture": {
                "maximum_amount_capturable": 2200,
                "status": "unavailable"
              },
              "regulated_status": "unregulated",
              "three_d_secure": null,
              "wallet": null
            },
            "type": "card"
          },
          "radar_options": {},
          "receipt_email": "plz@gmail.com",
          "receipt_number": null,
          "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xQnNjYkxLOUp2M3RDZ2NrKOuc1r0GMgZ6ARUgIqo6LBZvCoC0KHRIqMsHiOG37E38EzjayoFUXsB4WoKH_cYg4Jmk2eO1YmXUZHr8",
          "refunded": false,
          "refunds": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/charges/ch_3Qu87qK9Jv3tCgck1JKuQwfb/refunds"
          },
          "review": null,
          "shipping": null,
          "source": null,
          "source_transfer": null,
          "statement_descriptor": null,
          "statement_descriptor_suffix": null,
          "status": "succeeded",
          "transfer_data": null,
          "transfer_group": null
        }
      ],
      "has_more": false,
      "total_count": 1,
      "url": "/v1/charges?payment_intent=pi_3Qu87qK9Jv3tCgck1WB6Pi6g"
    },
    "client_secret": "pi_3Qu87qK9Jv3tCgck1WB6Pi6g_secret_gn2uSEzpPbhW1sBNanK13JxnI",
    "confirmation_method": "automatic",
    "created": 1739951722,
    "currency": "eur",
    "customer": "cus_RnjaABLpoZ1y5t",
    "description": null,
    "invoice": null,
    "last_payment_error": null,
    "latest_charge": "ch_3Qu87qK9Jv3tCgck1JKuQwfb",
    "livemode": false,
    "metadata": {},
    "next_action": null,
    "next_source_action": null,
    "on_behalf_of": null,
    "payment_method": "pm_1Qu87pK9Jv3tCgckfILNOzQo",
    "payment_method_configuration_details": null,
    "payment_method_options": {
      "card": {
        "installments": null,
        "mandate_options": null,
        "network": null,
        "request_three_d_secure": "automatic"
      }
    },
    "payment_method_types": [
      "card"
    ],
    "processing": null,
    "receipt_email": "plz@gmail.com",
    "review": null,
    "setup_future_usage": null,
    "shipping": null,
    "source": null,
    "statement_descriptor": null,
    "statement_descriptor_suffix": null,
    "status": "succeeded",
    "transfer_data": null,
    "transfer_group": null
  },
  "previous_attributes": null
}
```



[Documentation Carte]: https://docs.stripe.com/testing?locale=fr-FR
[Event]: https://dashboard.stripe.com/test/workbench/events

[summary]: ../README.md
