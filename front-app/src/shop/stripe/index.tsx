import React, { useCallback, useEffect, useState } from "react";
import { Elements, EmbeddedCheckout, EmbeddedCheckoutProvider, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { apiPost } from "../../common/utils/web";
import { ListBasketType } from "../boutique/type";

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

interface PaymentPageGenerationProps {
    basket: ListBasketType[];
}

export const PaymentPageGeneration = ({ basket }: PaymentPageGenerationProps) => {
    const id_stripe = localStorage.getItem("id_stripe");

    const fetchClientSecret = useCallback(() => {
        return apiPost(`3003/create-session/${id_stripe}`, basket).then((data) => data.clientSecret);
    }, [id_stripe]);

    const options = { fetchClientSecret };

    return (
        <>
            <div id="checkout">
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            </div>
        </>
    );
};
