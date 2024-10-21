import React, { useEffect, useState } from "react";
import { apiGet } from "../../../common/utils/web";
import { User } from "../../../common/types/user";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import SearchIcon from "@mui/icons-material/Search";
import ModeIcon from "@mui/icons-material/Mode";
import ClearIcon from "@mui/icons-material/Clear";

const columns: GridColDef<User>[] = [
    { field: "id", headerName: "Id", width: 30 },
    { field: "firstname", headerName: "Nom", width: 90 },
    { field: "lastname", headerName: "Prenom", width: 100, editable: true },
    { field: "email", headerName: "Email", width: 190, editable: true },
    { field: "birthDate", headerName: "Date naissance", type: "number", width: 110, editable: true },
    { field: "gender", headerName: "Genre", width: 70 },
    { field: "phone", headerName: "Téléphone", width: 150, editable: true },
    { field: "createdAt", headerName: "Date création", width: 150, editable: true },
    { field: "updatedAt", headerName: "Date mise à jour", type: "number", width: 110, editable: true },
    { field: "action", headerName: "Actions", renderCell: CellActionUserJob, width: 300 },
];

export const Job = () => {
    const [rows, setRows] = useState<User[]>([]);

    useEffect(() => {
        apiGet(`users/jobs/`, "GET").then((res) => setRows(res));
    }, []);

    return (
        <>
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
        </>
    );
};

function CellActionUserJob(props: GridRenderCellParams<any, Date>) {
    const { hasFocus, value } = props;
    const buttonElement = React.useRef<HTMLButtonElement>(null);
    const rippleRef = React.useRef<TouchRippleActions>(null);

    React.useLayoutEffect(() => {
        if (hasFocus) {
            const input = buttonElement.current!.querySelector("input");
            input?.focus();
        } else if (rippleRef.current) {
            // Only available in @mui/material v5.4.1 or later
            rippleRef.current.stop({} as any);
        }
    }, [hasFocus]);

    return (
        <>
            <strong>
                {value?.getFullYear() ?? ""}
                <Button
                    ref={buttonElement}
                    touchRippleRef={rippleRef}
                    variant="contained"
                    size="small"
                    style={{ marginLeft: 16 }}
                    // Remove button from tab sequence when cell does not have focus
                    tabIndex={hasFocus ? 0 : -1}
                    onKeyDown={(event: React.KeyboardEvent) => {
                        if (event.key === " ") {
                            // Prevent key navigation when focus is on button
                            event.stopPropagation();
                        }
                    }}
                >
                    <SearchIcon />
                </Button>
            </strong>

            <strong>
                {value?.getFullYear() ?? ""}
                <Button
                    ref={buttonElement}
                    touchRippleRef={rippleRef}
                    variant="contained"
                    size="small"
                    style={{ marginLeft: 16 }}
                    // Remove button from tab sequence when cell does not have focus
                    tabIndex={hasFocus ? 0 : -1}
                    onKeyDown={(event: React.KeyboardEvent) => {
                        if (event.key === " ") {
                            // Prevent key navigation when focus is on button
                            event.stopPropagation();
                        }
                    }}
                >
                    <ModeIcon />
                </Button>
            </strong>

            <strong>
                {value?.getFullYear() ?? ""}
                <Button
                    ref={buttonElement}
                    touchRippleRef={rippleRef}
                    variant="contained"
                    size="small"
                    style={{ marginLeft: 16 }}
                    // Remove button from tab sequence when cell does not have focus
                    tabIndex={hasFocus ? 0 : -1}
                    onKeyDown={(event: React.KeyboardEvent) => {
                        if (event.key === " ") {
                            // Prevent key navigation when focus is on button
                            event.stopPropagation();
                        }
                    }}
                >
                    <ClearIcon color="error" />
                </Button>
            </strong>
        </>
    );
}
