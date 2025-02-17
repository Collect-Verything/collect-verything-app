import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateStripeId } from "../../features/authentication-slice";
import { useAppDispatch } from "../../features/user-slice";
import { Typography } from "@mui/material";
import { Invoice } from "./type";
import { getInvoices, getUserStripeID } from "./request";

/*
 * Les composant facturation sont pour le moment commun à un user comme a un super admin ou metier concerné.
 * If user get facture from user id present dans le token
 * If metier or super adinm get all facture
 * Trouver un moyen de rendre commun le composant mais de changer le type de requete selon le role detecté
 * */

export const Facturation = () => {
    const user = useSelector((store: any) => store.authenticate);
    const dispatch = useAppDispatch();
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        getUserStripeID(user).then((data) => dispatch(updateStripeId(data.id_stripe)));
        getInvoices(user).then(setInvoices);
    }, []);

    if (!user.id_stripe || invoices.length === 0)
        return <Typography>Vous ne possedez aucune facture pour le moment</Typography>;

    return (
        <>
            {invoices.map((invoice) => (
                <p key={invoice.id}>{invoice.id}</p>
            ))}
        </>
    );
};
