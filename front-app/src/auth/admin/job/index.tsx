import React, { useEffect, useState } from "react";
import { User } from "../../../common/types/user";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./grid-definition";
import { getAllJobbers } from "./request";
import Grid from "@mui/material/Grid2";
import { CreateUserJob } from "./dialogs/create-user-job";

//  TODO: Faire en sorte que l'utilisateur connecté ne puisse pas ce supprimer , le mettre en surbrillance dans le data row
//  TODO: Creation d'un user, role obligatoire

export const Job = () => {
    const [rows, setRows] = useState<User[]>([]);

    useEffect(() => {
        getAllJobbers().then((res) => setRows(res));
    }, []);

    return (
        <Box sx={{ height: 700, width: "80%" }} padding={5} margin="auto" marginTop={2}>
            <Grid container justifyContent="flex-end" padding={5}>
                <CreateUserJob />
            </Grid>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
};
