import React, { useEffect, useState } from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_6YIhM0UXA4RMmJKovWtLYyJb");

export const PaymentStatus = () => {
    const stripe = useStripe();
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

        if (clientSecret) {
            stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
                if (paymentIntent) {
                    switch (paymentIntent.status) {
                        case "succeeded":
                            setMessage("Success! Payment received.");
                            break;

                        case "processing":
                            setMessage("Payment processing. We'll update you when payment is received.");
                            break;

                        case "requires_payment_method":
                            setMessage("Payment failed. Please try another payment method.");
                            break;

                        default:
                            setMessage("Something went wrong.");
                            break;
                    }
                }
            });
        }
    }, [stripe]);

    return message;
};

const StripeStatusPayement = () => {
    return (
        <Elements stripe={stripePromise}>
            <Page />
        </Elements>
    );
};

export default StripeStatusPayement;

const Page = () => {
    const statusMessage = PaymentStatus();

    return (
        <div>
            <h2>Payment Status</h2>
            {statusMessage ? <p>{statusMessage}</p> : <p>Loading...</p>}
        </div>
    );
};
//