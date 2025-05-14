import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columnsUser } from "./grid-definition";
import Grid from "@mui/material/Grid2";
import { CreateUserAndJob } from "./dialogs/create-user-job";
import { useAppDispatch } from "../../../features/authentication-slice";
import { fetchJobbers } from "../../../features/user-job-slice";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { RootState } from "../../../features/store";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { CenteredGrid } from "../../../common/components/grid-centered";

//  TODO: Faire en sorte que l'utilisateur connecté ne puisse pas se supprimer, le mettre en surbrillance dans la data row
//  TODO: Creation d'un user, role obligatoire

export const Job = () => {
    const dispatch = useAppDispatch();

    const { usersJobList, status } = useSelector((store: RootState) => store.userJob);

    const handleGetAllUserJobs = () => {
        dispatch(fetchJobbers());
    };

    useEffect(() => {
        handleGetAllUserJobs();
    }, []);

    return (
        <Box sx={{ height: 700, width: "80%" }} padding={5} margin="auto" marginTop={2}>
            {status === "loading" ? (
                <CenteredGrid>
                    <CircularProgress color="secondary" />
                </CenteredGrid>
            ) : status === "failed" ? (
                <CenteredGrid>
                    <Alert color="error">
                        <Typography>Impossible de charger les données</Typography>
                    </Alert>
                </CenteredGrid>
            ) : (
                <>
                    <Grid container justifyContent="space-between" alignItems="center" pb={5} pr={2} pl={2}>
                        <Grid>
                            <Typography variant="h4" component="div">
                                <Diversity2Icon fontSize="large" /> Gestion du personnel
                            </Typography>
                        </Grid>
                        <Grid>
                            <CreateUserAndJob isUser={false} handleGetAll={handleGetAllUserJobs} />
                        </Grid>
                    </Grid>
                    <DataGrid
                        rows={usersJobList || []}
                        columns={columnsUser}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </>
            )}
        </Box>
    );
};
