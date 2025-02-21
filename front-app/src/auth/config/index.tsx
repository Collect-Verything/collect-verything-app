import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Subscription } from "./type";
import { getUserListSolutionSub } from "./request";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columnsConfig } from "./grid-definition";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid2, Typography } from "@mui/material"; // Pour recuperer des config de solution client il faut suivre le workflox definit dans la doc conernant la facturation des service, une fois ceci fait un  ou des subscription sont disponible et consultable

// Pour recuperer des config de solution client il faut suivre le workflox definit dans la doc conernant la facturation des service, une fois ceci fait un  ou des subscription sont disponible et consultable

export const SubscriptionConfigDisplay = () => {
    const user = useSelector((store: any) => store.authenticate);
    const [listSolutions, setListSolutions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getUserListSolutionSub(user.id_stripe)
            .then(setListSolutions).catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <Box sx={{ height: 700, width: "80%" }} mt={10} padding={5} margin="auto" marginTop={2}>
            {isLoading ? (
                <Grid2 textAlign="center" spacing={2} mt={10}>
                    <CircularProgress color="secondary" />
                </Grid2>
            ) : listSolutions.length === 0 ? (
                <Grid2 textAlign="center" spacing={2} mt={10}>
                    <Typography>Vous ne possédez aucun abonnement ni configuration pour le moment.</Typography>
                </Grid2>
            ) : (
                <DataGrid
                    rows={listSolutions}
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
