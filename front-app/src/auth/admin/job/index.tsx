import React, { useEffect, useState } from "react";
import { User } from "../../../common/types/user";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./grid-definition";
import { getAllJobbers } from "./request";

//  TODO: Faire en sorte que l'utilisateur connecté ne puisse pas ce supprimer , le mettre en surbrillance dans le data row

export const Job = () => {
    const [rows, setRows] = useState<User[]>([]);

    useEffect(() => {
        getAllJobbers().then((res) => setRows(res));
    }, []);

    return (
        <Box sx={{ height: 300, width: "80%" }}>
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
