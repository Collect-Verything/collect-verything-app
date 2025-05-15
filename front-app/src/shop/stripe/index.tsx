import React, { useEffect } from "react";
import { Button, Grid2, Paper, Typography } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useAppDispatch } from "../../features/authentication-slice";
import { deleteAllBasketItems } from "../../features/basket-slice";
import Alert from "@mui/material/Alert";
import { PATH_NAME } from "../../common/const/path";

export const StripeStatusPayement = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(deleteAllBasketItems());
    }, []);

    return (
        <Grid2
            container
            direction="column"
            margin="auto"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            minHeight="60vh"
        >
            <Paper
                elevation={3}
                sx={{
                    px: 6,
                    py: 8,
                    maxWidth: 420,
                    textAlign: "center",
                    borderRadius: 4,
                }}
            >
                <Typography variant="h5" mb="10px">
                    Paiement effectué avec succès <DoneOutlineIcon color="success" />
                </Typography>

                <Button
                    variant="contained"
                    href={`/auth/${PATH_NAME.FACTURATION}`}
                    sx={{
                        marginTop: "5px",
                        padding: "5px 23px",
                        borderRadius: "20px",
                        textTransform: "none",
                        "&:hover": {
                            bgcolor: "darkgray",
                        },
                    }}
                >
                    Consulter vos factures
                </Button>
            </Paper>
            <Alert color="warning" sx={{ marginTop: "20px" }}>
                Si l&apos;application n&apos;est pas en prod, penser a simuler l&apos;evenement facturation avec POSTMAN
                pour consulter cette facture, checker la documentation
            </Alert>
        </Grid2>
    );
};

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
