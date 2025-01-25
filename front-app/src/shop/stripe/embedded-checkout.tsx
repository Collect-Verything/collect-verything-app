import { ListBasketType } from "../boutique/type"; // import React, { useCallback, useEffect, useState } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPatch, apiPost } from "../../common/utils/web";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { URL_FRONT } from "../../app/router/const";
import { setFromLocalStorage } from "../../common/utils/local-storage";
import { FacturationUrlWithPort, UserUrlWithPort } from "../../app/micro-services";
import CircularProgress from "@mui/material/CircularProgress";
import { updateStripeId } from "../../features/authentication-slice";
import { useAppDispatch } from "../../features/user-slice"; //

const stripePromise = loadStripe("pk_test_6YIhM0UXA4RMmJKovWtLYyJb");

// TODO: FIX -> Lors du rechargement de la page, l'état du store semble ne plus être présent, ce qui entraîne des incohérences.
// Problème constaté sur la page de paiement :
// 1. Vérifier dans la base de données le champ `stripe_id`.
// 2. Lors du rechargement de la page sur le formulaire de paiement Stripe, le store est réinitialisé.
// 3. Si l'utilisateur revient sur le formulaire de paiement fonctionnel, un nouvel `stripe_id` est créé en base, ce qui génère un nouvel utilisateur dans Stripe.
// => Cela provoque un problème critique avec la duplication des utilisateurs dans Stripe.
// Solution à explorer : persister l'état du `stripe_id` dans le localStorage ou sécuriser la logique côté backend pour éviter la création d'un nouvel utilisateur inutilement.

export const CheckUserStripeIdForPayment = () => {
    const user = useSelector((store: any) => store.authenticate);
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    const fetchData = async () => {
        const userById = await apiGet(`${UserUrlWithPort}/${user.id}`);
        const stripeResponse = await apiPost(`${FacturationUrlWithPort}/customer/create`, userById);
        await dispatch(updateStripeId(stripeResponse.id));
        await apiPatch(`${UserUrlWithPort}/stripe-user/${user.id}/${stripeResponse.id}`);
    };

    useEffect(() => {
        if (!user.id_stripe) {
            fetchData().then(() => nav(`/${URL_FRONT.PAYMENT}`));
        }
        if (user.id_stripe) {
            nav(`/${URL_FRONT.PAYMENT}`);
        }
    }, []);

    return (
        <Grid direction="row" height="50vh" container justifyContent="center" alignItems="center">
            <CircularProgress color="secondary" size="4rem" />
        </Grid>
    );
};

export const PaymentPage = () => {
    const nav = useNavigate();
    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
    const user = useSelector((store: any) => store.authenticate);

    useEffect(() => {
        setFromLocalStorage("basket", setListBasket);
    }, []);

    const fetchClientSecret = useCallback(async () => {
        const data = await apiPost(`${FacturationUrlWithPort}/checkout/create/${user.id_stripe}`, listBasket);
        return data.clientSecret;
    }, [listBasket]);

    const options = { fetchClientSecret };
    if (listBasket.length === 0 || !user.id_stripe) return null;

    return (
        <Grid id="checkout">
            <Button sx={{ marginLeft: "50px", marginTop: "50px" }} onClick={() => nav(`/${URL_FRONT.BASKET}`)}>
                <KeyboardBackspaceIcon color="secondary" />
                <Typography color="black">Retour au panier</Typography>
            </Button>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </Grid>
    );
};
