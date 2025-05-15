import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { useAppDispatch } from "../../../features/authentication-slice";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { columnsUser } from "../job/grid-definition";
import { fetchUsers } from "../../../features/user-slice";
import { CreateUserAndJob } from "../job/dialogs/create-user-job";
import { RootState } from "../../../features/store";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { CenteredGrid } from "../../../common/components/grid-centered";

export const Customer = () => {
    const dispatch = useAppDispatch();

    const { usersList, status } = useSelector((store: RootState) => store.user);

    const handleGetAllUsers = () => {
        dispatch(fetchUsers());
    };

    useEffect(() => {
        handleGetAllUsers();
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
                                <ConnectWithoutContactIcon fontSize="large" /> Gestion client
                            </Typography>
                        </Grid>
                        <Grid>
                            <CreateUserAndJob isUser={true} handleGetAll={handleGetAllUsers} />
                        </Grid>
                    </Grid>
                    <DataGrid
                        rows={usersList || []}
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
