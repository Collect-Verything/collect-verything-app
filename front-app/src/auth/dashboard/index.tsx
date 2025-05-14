import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";
import { RootState } from "../../features/store";
import Grid from "@mui/material/Grid2";
import { CenteredGrid } from "../../common/components/grid-centered";

export const AuthDashboard = () => {
    const { role, firstname, lastname } = useSelector((store: RootState) => store.authenticate);

    return (
        <CenteredGrid>
            <Typography variant="h4" gutterBottom>
                Bonjour {firstname} {lastname}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                {"Rôle : " + role}
            </Typography>

            <Typography variant="h5" gutterBottom>
                Tableau de bord principal
            </Typography>

            <Grid container spacing={4}>
                <Grid>
                    <Card className="shadow-lg rounded-2xl">
                        <CardContent>
                            <Typography variant="h6">Utilisateurs inscrits</Typography>
                            <Typography variant="h4" color="primary">
                                1,234
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid>
                    <Card className="shadow-lg rounded-2xl">
                        <CardContent>
                            <Typography variant="h6">Transactions du jour</Typography>
                            <Typography variant="h4" color="secondary">
                                347
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid>
                    <Card className="shadow-lg rounded-2xl">
                        <CardContent>
                            <Typography variant="h6">Support en attente</Typography>
                            <Typography variant="h4" color="error">
                                12
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </CenteredGrid>
    );
};
