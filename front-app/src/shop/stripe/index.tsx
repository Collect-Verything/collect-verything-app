import React from "react";
import { Button, Grid2, Typography } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import {URL_FRONT} from "../../app/router/const";

// const stripePromise = loadStripe("pk_test_6YIhM0UXA4RMmJKovWtLYyJb");
//
// export const PaymentStatus = () => {
//     const stripe = useStripe();
//     const [message, setMessage] = useState<string>();
//
//     useEffect(() => {
//         if (!stripe) {
//             return;
//         }
//
//         const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
//
//         if (clientSecret) {
//             stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//                 if (paymentIntent) {
//                     switch (paymentIntent.status) {
//                         case "succeeded":
//                             setMessage("Success! Payment received.");
//                             break;
//
//                         case "processing":
//                             setMessage("Payment processing. We'll update you when payment is received.");
//                             break;
//
//                         case "requires_payment_method":
//                             setMessage("Payment failed. Please try another payment method.");
//                             break;
//
//                         default:
//                             setMessage("Something went wrong.");
//                             break;
//                     }
//                 }
//             });
//         }
//     }, [stripe]);
//
//     return message;
// };

const StripeStatusPayement = () => {
    return (
        // <Elements stripe={stripePromise}>
        //     <Page />
        // </Elements>

        <Grid2
            height="50vh"
            display="flex"
            flexDirection="column"
            flexWrap="nowrap"
            alignContent="center"
            justifyContent="center"
            alignItems="center"
        >
            <Grid2>
                <Typography variant="h5">
                    Paiement effectué avec succès <DoneOutlineIcon color="success" />
                </Typography>
            </Grid2>
            <Grid2>
                <Button href={`/auth/${URL_FRONT.FACTURATION}`}>
                    <Typography color="secondary">Consulter vos factures</Typography>
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default StripeStatusPayement;

// const Page = () => {
//     const statusMessage = PaymentStatus();
//
//     return (
//         <div>
//             <h2>Payment Status</h2>
//             {statusMessage ? <p>{statusMessage}</p> : <p>Loading...</p>}
//         </div>
//     );
// };
