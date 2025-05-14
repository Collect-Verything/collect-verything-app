import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columnsConfig } from "./grid-definition";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Grid2, Typography } from "@mui/material";
import { useAppDispatch } from "../../features/authentication-slice";
import { fetchUserSubscriptions, recoveryUserSubscriptions } from "../../features/subscription-slice";
import Alert from "@mui/material/Alert";
import { RootState } from "../../features/store";
import Grid from "@mui/material/Grid2";
import TuneIcon from "@mui/icons-material/Tune";
import { CenteredGrid } from "../../common/components/grid-centered";

// Pour recuperer des config de solution client il faut suivre le workflox definit dans la doc conernant la facturation des service, une fois ceci fait un  ou des subscription sont disponible et consultable

export const SubscriptionConfigDisplay = () => {
    const user = useSelector((store: RootState) => store.authenticate);
    const { listSub = [], status } = useSelector((store: RootState) => store.subscription);
    const dispatch = useAppDispatch();

    const recoverSubs = async () => {
        dispatch(recoveryUserSubscriptions(user.id_stripe!))
            .catch(console.error)
            .then(() => dispatch(fetchUserSubscriptions(user.id_stripe!)).catch(console.error));
    };

    useEffect(() => {
        dispatch(fetchUserSubscriptions(user.id_stripe!)).catch(console.error);
    }, []);

    return (
        <Box sx={{ height: 700, width: "80%" }} padding={5} margin="auto" marginTop={2}>
            {status === "failed" && (
                <CenteredGrid>
                    <Alert severity="error">Un probleme est apparut.</Alert>
                </CenteredGrid>
            )}
            {status === "loading" ? (
                <CenteredGrid>
                    <CircularProgress color="secondary" />
                </CenteredGrid>
            ) : listSub.length === 0 ? (
                <Grid2 textAlign="center" spacing={2} mt={10}>
                    <Typography>Vous ne possédez aucun abonnement ni configuration pour le moment.</Typography>
                    <Alert sx={{ marginTop: 3 }} severity="info">
                        <Typography>
                            Si vous possediez des abonement precedement, vous pouvez tenter de faire une recuperation ou
                            de contacter le support.
                        </Typography>
                        <Button onClick={recoverSubs} color="secondary">
                            Recuperation
                        </Button>
                        <Button color="secondary">Contacter le support</Button>
                    </Alert>
                </Grid2>
            ) : (
                <>
                    <Grid container justifyContent="space-between" alignItems="center" pb={5} pr={2} pl={2}>
                        <Grid>
                            <Typography variant="h4" component="div">
                                <TuneIcon fontSize="large" /> Configuration
                            </Typography>
                        </Grid>
                    </Grid>
                    <DataGrid
                        rows={listSub}
                        columns={columnsConfig}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </>
            )}
        </Box>
    );
};
