import { ListBasketType } from "../boutique/type";
import React, { useCallback, useEffect, useState } from "react";
import { apiPost } from "../../common/utils/web";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { URL_FRONT } from "../../app/router/const";
import { setFromLocalStorage } from "../../common/utils/local-storage";
import { FacturationUrlWithPort } from "../../app/micro-services";
import { STRIPE_DETECTION } from "../../common/utils/stripe";
import { useSelector } from "react-redux";
import { User } from "../../common/types/user";

const stripePromise = loadStripe("pk_test_6YIhM0UXA4RMmJKovWtLYyJb");

export const PaymentPageGeneration = () => {

    const user = useSelector((store: any) => store.authenticate);

    const nav = useNavigate();

    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
    const [userState, setUserState] = useState<Partial<User> | null>(null);

    const fetchClientSecret = useCallback(async () => {
        const data = await apiPost(`${FacturationUrlWithPort}/checkout/create/${userState?.id_stripe}`, listBasket);
        return data.clientSecret;
    }, [listBasket]);

    const options = { fetchClientSecret };

    useEffect(() => {
        setFromLocalStorage("basket", setListBasket);
    }, []);

    useEffect(() => {
        setUserState(user);
    }, [user]);

    if (listBasket.length === 0 || !userState?.id_stripe) return null;

    return (
        <>
            {userState?.id_stripe === STRIPE_DETECTION.NONE_USER && (
                <Grid container justifyContent="center" height="50vh">
                    <Button href={"create-user-stripe"}>Generer </Button>
                </Grid>
            )}
            {userState?.id_stripe !== STRIPE_DETECTION.NONE_USER && (
                <Grid id="checkout">
                    <Button sx={{ marginLeft: "50px", marginTop: "50px" }} onClick={() => nav(`/${URL_FRONT.BASKET}`)}>
                        <KeyboardBackspaceIcon color="secondary" />
                        <Typography color="black">Retour au panier</Typography>
                    </Button>
                    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                </Grid>
            )}
        </>
    );
};
