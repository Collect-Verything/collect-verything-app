import { apiGet, apiPatch, apiPost } from "../../common/utils/web";
import { FacturationUrlWithPort, UserUrlWithPort } from "../../app/micro-services";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const CreateUserStripePage = () => {
    const { id } = useSelector((store: any) => store.authenticate);
    const nav = useNavigate();

    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            localStorage.removeItem("id_stripe");
            try {

                const userById = await apiGet(`${UserUrlWithPort}/${id}`);
                const stripeResponse = await apiPost(`${FacturationUrlWithPort}/customer/create`, userById);
                const stripe_id = stripeResponse.id;
                await apiPatch(`${UserUrlWithPort}/stripe-user/${id}/${stripe_id}`);
                localStorage.setItem("id_stripe",stripe_id);
                setIsCreate(true);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            {!isCreate ? (
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
