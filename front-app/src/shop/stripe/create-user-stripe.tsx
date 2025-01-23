import { useAppDispatch } from "../../features/user-slice";
import { apiGet, apiPatch, apiPost } from "../../common/utils/web";
import { FacturationUrlWithPort, UserUrlWithPort } from "../../app/micro-services";
import { updateStripeId } from "../../features/authentication-slice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { URL_FRONT } from "../../app/router/const";

export const CreateUserStripePage = () => {
    const { userId,id_stripe } = useSelector((store: any) => store.authenticate);
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const userById = await apiGet(`${UserUrlWithPort}/${userId}`);
                const stripeResponse = await apiPost(`${FacturationUrlWithPort}/customer/create`, userById);
                const stripe_id = stripeResponse.id;
                await apiPatch(`${UserUrlWithPort}/stripe-user/${userId}/${stripe_id}`);
                dispatch(updateStripeId(stripe_id));
                setIsCreate(true);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    // nav("/embedded-checkout");

    return (
        <>
            {isCreate ? (
                <p>Chargement...</p>
            ) : (
                <>
                    <p>
                        Votre compte de facturation vient d etre generé, vous pouvez retourner au formulaire de paiement
                    </p>
                    <Button onClick={() => nav(`/basket`)}>Formulaire de paiement</Button>
                </>
            )}
        </>
    );
};
