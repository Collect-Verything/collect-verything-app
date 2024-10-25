import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import { useAppDispatch } from "../../../features/authentication-slice";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { columns } from "../job/grid-definition";
import { fetchUsers } from "../../../features/user-slice";
import { CreateUserJob } from "../job/dialogs/create-user-job";

//  TODO: Creation d'un user, role obligatoire

export const Customer = () => {
    const dispatch = useAppDispatch();

    const { usersList, status } = useSelector((store: any) => store.user);

    const handleGetAllUsers = () => {
        dispatch(fetchUsers());
    };

    useEffect(() => {
        handleGetAllUsers();
    }, []);

    return (
        <Box sx={{ height: 700, width: "80%" }} padding={5} margin="auto" marginTop={2}>
            <Grid container justifyContent="flex-end" padding={5}>
                <CreateUserJob isUser={true} handleGetAll={handleGetAllUsers} />
            </Grid>
            {status === "loading" ? (
                // TODO : Center au milieu de la page
                <CircularProgress color="secondary" />
            ) : status === "failed" ? (
                <PriorityHighIcon color="error" />
            ) : (
                <DataGrid
                    rows={usersList || []}
                    columns={columns}
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
