import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columnsUser } from "./grid-definition";
import Grid from "@mui/material/Grid2";
import { CreateUserJob } from "./dialogs/create-user-job";
import { useAppDispatch } from "../../../features/authentication-slice";
import { fetchJobbers } from "../../../features/user-job-slice";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

//  TODO: Faire en sorte que l'utilisateur connecté ne puisse pas se supprimer, le mettre en surbrillance dans la data row
//  TODO: Creation d'un user, role obligatoire

export const Job = () => {
    const dispatch = useAppDispatch();

    const { usersJobList, status } = useSelector((store: any) => store.userJob);

    const handleGetAllUserJobs = () => {
        dispatch(fetchJobbers());
    };

    useEffect(() => {
        handleGetAllUserJobs();
    }, []);

    return (
        <Box sx={{ height: 700, width: "80%" }} padding={5} margin="auto" marginTop={2}>
            <Grid container justifyContent="flex-end" padding={5}>
                <CreateUserJob isUser={false} handleGetAll={handleGetAllUserJobs} />
            </Grid>
            {status === "loading" ? (
                // TODO : Center au milieu de la page
                <CircularProgress color="secondary" />
            ) : status === "failed" ? (
                <PriorityHighIcon color="error" />
            ) : (
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
            )}
        </Box>
    );
};
