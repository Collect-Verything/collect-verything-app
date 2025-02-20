import React, {useEffect, useState} from "react";
import {apiGet} from "../../common/utils/web";
import {useSelector} from "react-redux";

// Pour recuperer des config de solution client il faut suivre le workflox definit dans la doc conernant la facturation des service, une fois ceci fait un  ou des subscription sont disponible et consultable

export const ConfigProducts = () => {
    const user = useSelector((store: any) => store.authenticate);
    const [listSolutions, setListSolutions] = useState<any[]>([]);

    useEffect(() => {
        apiGet(`3004/subscription/${user.id_stripe}`).then((res)=>setListSolutions(res.data))
    }, []);

    if (listSolutions.length === 0) return <p>ConfigProducts page</p>;

    return (
        <>
            <p>Ici</p>
            {listSolutions.map((sub) =>
               ( <p key={sub.id}> id : {sub.id}</p>)
            )}
        </>
    )
};

// Subscription object List -> data[0]

// HERE = Imformation importante a collecter pour le modele
//
// {
//     "object": "list",
//     "data": [
//     {
// HERE          "id": "sub_1QtUlZK9Jv3tCgckFInybsrv",
//         "object": "subscription",
//         "application": null,
//         "application_fee_percent": null,
//         "automatic_tax": {
//             "disabled_reason": null,
//             "enabled": false,
//             "liability": null
//         },
//         "billing_cycle_anchor": 1739800425,
//         "billing_cycle_anchor_config": null,
//         "billing_thresholds": null,
//         "cancel_at": null,
//         "cancel_at_period_end": false,
//         "canceled_at": null,
//         "cancellation_details": {
//             "comment": null,
//             "feedback": null,
//             "reason": null
//         },
//         "collection_method": "charge_automatically",
//         "created": 1739800425,
//         "currency": "eur",
// HERE         "current_period_end": 1742219625,
// HERE         "current_period_start": 1739800425,
// HERE         "customer": "cus_RmzpxFcuDJqenR",
//         "days_until_due": null,
//         "default_payment_method": "pm_1QtUlYK9Jv3tCgckbnQ4WZqc",
//         "default_source": null,
//         "default_tax_rates": [],
//         "description": null,
//         "discount": null,
//         "discounts": [],
//         "ended_at": null,
//         "invoice_settings": {
//             "account_tax_ids": null,
//             "issuer": {
//                 "type": "self"
//             }
//         },
//         "items": {
//             "object": "list",
//             "data": [
//                 {
//                     "id": "si_Rn4vjf4oOejRII",
//                     "object": "subscription_item",
//                     "billing_thresholds": null,
//                     "created": 1739800426,
//                     "discounts": [],
//                     "metadata": {},
//                     "plan": {
//                         "id": "price_1QsJxZK9Jv3tCgckzFsSi7pZ",
//                         "object": "plan",
//                         "active": true,
//                         "aggregate_usage": null,
//                         "amount": 1100,
//                         "amount_decimal": "1100",
//                         "billing_scheme": "per_unit",
//                         "created": 1739520557,
//                         "currency": "eur",
//                         "interval": "month",
//                         "interval_count": 1,
//                         "livemode": false,
//                         "metadata": {},
//                         "meter": null,
//                         "nickname": null,
//                         "product": "prod_RlrgAJQoKHFtZF",
//                         "tiers_mode": null,
//                         "transform_usage": null,
//                         "trial_period_days": null,
//                         "usage_type": "licensed"
//                     },
//                     "price": {
//                         "id": "price_1QsJxZK9Jv3tCgckzFsSi7pZ",
//                         "object": "price",
//                         "active": true,
//                         "billing_scheme": "per_unit",
//                         "created": 1739520557,
//                         "currency": "eur",
//                         "custom_unit_amount": null,
//                         "livemode": false,
//                         "lookup_key": null,
//                         "metadata": {},
//                         "nickname": null,
//                         "product": "prod_RlrgAJQoKHFtZF",
//                         "recurring": {
//                             "aggregate_usage": null,
//                             "interval": "month",
//                             "interval_count": 1,
//                             "meter": null,
//                             "trial_period_days": null,
//                             "usage_type": "licensed"
//                         },
//                         "tax_behavior": "unspecified",
//                         "tiers_mode": null,
//                         "transform_quantity": null,
//                         "type": "recurring",
//                         "unit_amount": 1100,
//                         "unit_amount_decimal": "1100"
//                     },
//                     "quantity": 1,
//                     "subscription": "sub_1QtUlZK9Jv3tCgckFInybsrv",
//                     "tax_rates": []
//                 }
//             ],
//             "has_more": false,
//             "total_count": 1,
//             "url": "/v1/subscription_items?subscription=sub_1QtUlZK9Jv3tCgckFInybsrv"
//         },
//         "latest_invoice": "in_1QtUlZK9Jv3tCgckCvv8nWuK",
//         "livemode": false,
//         "metadata": {},
//         "next_pending_invoice_item_invoice": null,
//         "on_behalf_of": null,
//         "pause_collection": null,
//         "payment_settings": {
//             "payment_method_options": {
//                 "acss_debit": null,
//                 "bancontact": null,
//                 "card": {
//                     "network": null,
//                     "request_three_d_secure": "automatic"
//                 },
//                 "customer_balance": null,
//                 "konbini": null,
//                 "sepa_debit": null,
//                 "us_bank_account": null
//             },
//             "payment_method_types": null,
//             "save_default_payment_method": "off"
//         },
//         "pending_invoice_item_interval": null,
//         "pending_setup_intent": null,
//         "pending_update": null,
//         "plan": {
//             "id": "price_1QsJxZK9Jv3tCgckzFsSi7pZ",
//             "object": "plan",
//             "active": true,
//             "aggregate_usage": null,
//             "amount": 1100,
//             "amount_decimal": "1100",
//             "billing_scheme": "per_unit",
//             "created": 1739520557,
//             "currency": "eur",
//             "interval": "month",
//             "interval_count": 1,
//             "livemode": false,
//             "metadata": {},
//             "meter": null,
//             "nickname": null,
//             "product": "prod_RlrgAJQoKHFtZF",
//             "tiers_mode": null,
//             "transform_usage": null,
//             "trial_period_days": null,
//             "usage_type": "licensed"
//         },
//         "quantity": 1,
//         "schedule": null,
//         "start_date": 1739800425,
//  HERE       "status": "active",
//         "test_clock": null,
//         "transfer_data": null,
//         "trial_end": null,
//         "trial_settings": {
//             "end_behavior": {
//                 "missing_payment_method": "create_invoice"
//             }
//         },
//         "trial_start": null
//     },
// ...
// ],
//     "has_more": false,
//     "url": "/v1/subscriptions"
// }