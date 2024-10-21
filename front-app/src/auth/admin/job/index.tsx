import React, { useEffect, useState } from "react";
import { apiGet } from "../../../common/utils/web";
import { User } from "../../../common/types/user";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./grid-definition";

export const Job = () => {
    const [rows, setRows] = useState<User[]>([]);

    useEffect(() => {
        apiGet(`users/jobs/`, "GET").then((res) => setRows(res));
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
