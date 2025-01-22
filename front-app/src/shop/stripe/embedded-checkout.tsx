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
import {setFromLocalStorage} from "../../common/utils/local-storage";

const stripePromise = loadStripe("pk_test_6YIhM0UXA4RMmJKovWtLYyJb");

export const PaymentPageGeneration = () => {
    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
    const id_stripe = localStorage.getItem("id_stripe") || "";
    const nav = useNavigate();

    const fetchClientSecret = useCallback(async () => {
        const data = await apiPost(`3003/create-session/${id_stripe}`, listBasket);
        return data.clientSecret;
    }, [listBasket]);

    const options = { fetchClientSecret };

    useEffect(() => {
        setFromLocalStorage("basket", setListBasket);
    }, []);

    if (listBasket.length === 0 || !id_stripe) return null;

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
