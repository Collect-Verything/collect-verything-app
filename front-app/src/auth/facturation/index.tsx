import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateStripeId } from "../../features/authentication-slice";
import { useAppDispatch } from "../../features/user-slice";
import { Grid2, Typography } from "@mui/material";
import { InvoiceEntity } from "./type";
import { getInvoices, getUserStripeID } from "./request";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columnsInvoices } from "./grid-definition";
import CircularProgress from "@mui/material/CircularProgress";

// TODO : Creer un recovery facturation comme pour les sub

/*
 * Les composant facturation sont pour le moment commun à un user comme a un super admin ou metier concerné.
 * If user get facture from user id present dans le token
 * If metier or super adinm get all facture
 * Trouver un moyen de rendre commun le composant mais de changer le type de requete selon le role detecté
 * */

export const Facturation = () => {
    const user = useSelector((store: any) => store.authenticate);
    const dispatch = useAppDispatch();
    const [invoices, setInvoices] = useState<InvoiceEntity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stripeData = await getUserStripeID(user);
                dispatch(updateStripeId(stripeData.id_stripe));

                const fetchedInvoices = await getInvoices(user);
                setInvoices(fetchedInvoices);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ height: 700, width: "80%" }} mt={10} padding={5} margin="auto" marginTop={2}>
            {isLoading ? (
                <Grid2 textAlign="center" spacing={2} mt={10}>
                    <CircularProgress color="secondary" />
                </Grid2>
            ) : !user.id_stripe || invoices.length === 0 ? (
                <Grid2 textAlign="center" spacing={2} mt={10}>
                    <Typography>Vous ne possédez aucune facture pour le moment.</Typography>
                </Grid2>
            ) : (
                <DataGrid
                    rows={invoices}
                    columns={columnsInvoices}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            )}
        </Box>
    );
};
