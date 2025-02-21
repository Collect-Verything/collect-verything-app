import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columnsConfig } from "./grid-definition";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid2, Typography } from "@mui/material";
import { useAppDispatch } from "../../features/authentication-slice";
import { fetchUserSubscriptions } from "../../features/subscription-slice";
import Alert from "@mui/material/Alert";

// Pour recuperer des config de solution client il faut suivre le workflox definit dans la doc conernant la facturation des service, une fois ceci fait un  ou des subscription sont disponible et consultable

export const SubscriptionConfigDisplay = () => {
    const user = useSelector((store: any) => store.authenticate);
    const { listSub = [], status } = useSelector((store: any) => store.subscription);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserSubscriptions(user.id_stripe)).catch(console.error);
    }, []);

    return (
        <Box sx={{ height: 700, width: "80%" }} mt={10} padding={5} margin="auto" marginTop={2}>
            {status === "failed" && <Alert severity="error">Un probleme est apparut.</Alert>}
            {status === "loading" ? (
                <Grid2 textAlign="center" spacing={2} mt={10}>
                    <CircularProgress color="secondary" />
                </Grid2>
            ) : listSub.length === 0 ? (
                <Grid2 textAlign="center" spacing={2} mt={10}>
                    <Typography>Vous ne possédez aucun abonnement ni configuration pour le moment.</Typography>
                </Grid2>
            ) : (
                <DataGrid
                    rows={listSub}
                    columns={columnsConfig}
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
