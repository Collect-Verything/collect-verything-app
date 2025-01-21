import React, { useEffect, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { apiGet, apiPost } from "../../common/utils/web";
import { ListBasketType } from "../boutique/type";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

// Doc : https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=elements

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_6YIhM0UXA4RMmJKovWtLYyJb");

function transformNumber(value: number): number {
    if (Number.isInteger(value)) {
        // Si c'est un entier, multiplier par 100
        return value * 100;
    } else {
        // Si c'est un flottant
        const [integerPart, decimalPart] = value.toString().split(".");
        const reversedDecimal = decimalPart.split("").reverse().join("");
        return parseInt(integerPart + reversedDecimal, 10);
    }
}

interface Intent {
    client_secret: string;
}

interface StripeLayoutProps {
    totalPrice: number;
}

export const StripLayout = ({ totalPrice }: StripeLayoutProps) => {
    const [intent, setIntent] = useState<Intent>();

    useEffect(() => {
        apiGet(`3003/${transformNumber(totalPrice)}`).then(setIntent);
    }, []);

    const options = {
        // passing the client secret obtained in step 3
        clientSecret: intent?.client_secret,
        // Fully customizable with appearance API.
        appearance: {},
    };

    if (!intent) return null;

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/stripe-status-payement",
            },
        });

        if (error) {
            // Show error to your customer (e.g., payment details incomplete)
            setErrorMessage(error.message || JSON.stringify(error)); // Ensure error is a string
        } else {
            // Handle successful payment confirmation, or customer redirection.
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={!stripe}>Submit</button>
            {/* Show error message to your customers */}
            {errorMessage && (
                <div>{typeof errorMessage === "string" ? errorMessage : JSON.stringify(errorMessage)}</div>
            )}
        </form>
    );
};

export const PaymentStatus = () => {
    const stripe = useStripe();
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        // Retrieve the "payment_intent_client_secret" query parameter appended to
        // your return_url by Stripe.js
        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

        // Retrieve the PaymentIntent
        if (clientSecret) {
            stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
                // Inspect the PaymentIntent `status` to indicate the status of the payment
                // to your customer.
                //
                // Some payment methods will [immediately succeed or fail][0] upon
                // confirmation, while others will first enter a `processing` state.
                //
                // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
                if (paymentIntent) {
                    switch (paymentIntent.status) {
                        case "succeeded":
                            setMessage("Success! Payment received.");
                            break;

                        case "processing":
                            setMessage("Payment processing. We'll update you when payment is received.");
                            break;

                        case "requires_payment_method":
                            // Redirect your user back to your payment page to attempt collecting
                            // payment again
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
            <Page /> {/* TestPage est maintenant dans le contexte Elements */}
        </Elements>
    );
};

export default StripeStatusPayement;

const Page = () => {
    const statusMessage = PaymentStatus(); // Utilisation du hook PaymentStatus

    return (
        <div>
            <h2>Payment Status</h2>
            {statusMessage ? (
                <p>{statusMessage}</p> // Affichage du message selon le statut du paiement
            ) : (
                <p>Loading...</p> // Affichage du message pendant la récupération du statut
            )}
        </div>
    );
};

interface PaymentPageGenerationProps {
    basket: ListBasketType[];
}

export const PaymentPageGeneration = ({ basket }: PaymentPageGenerationProps) => {
    const [paymentLink, setPaymentLink] = useState<{ url: string } | null>(null);
    const { id_stripe } = useSelector((store: any) => store.authenticate);

    const generatePaymentPage = () => {
        apiPost(`3003/create-session/${id_stripe}`, basket).then(setPaymentLink);
    };

    return (
        <>
            <Button onClick={generatePaymentPage}>Passer à la page de paiement</Button>
            {paymentLink && (
                <>
                    <Button href={paymentLink.url}>Link</Button>
                </>
            )}
        </>
    );
};
