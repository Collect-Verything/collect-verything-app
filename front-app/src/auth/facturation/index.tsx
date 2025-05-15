import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateStripeId } from "../../features/authentication-slice";
import { useAppDispatch } from "../../features/user-slice";
import { Typography } from "@mui/material";
import { InvoiceEntity } from "./type";
import { getInvoices, getUserStripeID } from "./request";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columnsInvoices } from "./grid-definition";
import CircularProgress from "@mui/material/CircularProgress";
import { RootState } from "../../features/store";
import { User } from "../../common/types/user";
import { NoBills } from "./components";
import Grid from "@mui/material/Grid";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { CenteredGrid } from "../../common/components/grid-centered";

// TODO : Creer un recovery facturation comme pour les sub

/*
 * Les composant facturation sont pour le moment commun à un user comme a un super admin ou metier concerné.
 * If user get facture from user id present dans le token
 * If metier or super adinm get all facture
 * Trouver un moyen de rendre commun le composant mais de changer le type de requete selon le role detecté
 * */

export const Facturation = () => {
    const user = useSelector((state: RootState) => state.authenticate) as User | null;
    const dispatch = useAppDispatch();

    const [invoices, setInvoices] = useState<InvoiceEntity[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInvoices = useCallback(
        async (signal: AbortSignal) => {
            if (!user) return;

            setIsLoading(true);

            try {
                const { id_stripe } = await getUserStripeID(user);
                if (!id_stripe) return;

                dispatch(updateStripeId(id_stripe));

                const list = await getInvoices(user);
                if (!signal.aborted) setInvoices(list);
            } catch (err) {
                if (!(err instanceof DOMException && err.name === "AbortError")) {
                    console.error("Facturation error:", (err as Error).message);
                }
            } finally {
                !signal.aborted && setIsLoading(false);
            }
        },
        [user, dispatch],
    );

    useEffect(() => {
        const ac = new AbortController();
        fetchInvoices(ac.signal);
        return () => ac.abort();
    }, [fetchInvoices]);

    if (isLoading) {
        return (
            <CenteredGrid>
                <CircularProgress color="secondary" />
            </CenteredGrid>
        );
    }

    if (!user?.id_stripe || invoices.length === 0) return <NoBills />;

    return (
        <Box sx={{ height: 700, width: "80%", mt: 2, p: 5, mx: "auto" }}>
            <Grid container justifyContent="space-between" alignItems="center" pb={5} pr={2} pl={2}>
                <Grid>
                    <Typography variant="h4" component="div">
                        <ReceiptIcon fontSize="large" /> Facturation
                    </Typography>
                </Grid>
            </Grid>
            <DataGrid<InvoiceEntity>
                rows={invoices}
                columns={columnsInvoices}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
            />
        </Box>
    );
};
