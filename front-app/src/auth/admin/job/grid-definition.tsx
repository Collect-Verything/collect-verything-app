import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { User } from "../../../common/types/user";
import React from "react";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { CheckUserJob } from "./dialogs/check-user-job";
import { ModifyUserJob } from "./dialogs/modify-user-job";
import { DeleteUserJob } from "./dialogs/delete-user-job";
import { Box } from "@mui/material";

export const columns: GridColDef<User>[] = [
    { field: "id", headerName: "Id", width: 30 },
    { field: "firstname", headerName: "Nom", width: 90 },
    { field: "lastname", headerName: "Prenom", width: 100, editable: true },
    { field: "email", headerName: "Email", width: 190, editable: true },
    { field: "birthDate", headerName: "Date naissance", type: "number", width: 110, editable: true },
    { field: "gender", headerName: "Genre", width: 70 },
    { field: "phone", headerName: "Téléphone", width: 150, editable: true },
    { field: "createdAt", headerName: "Date création", width: 150, editable: true },
    { field: "updatedAt", headerName: "Date mise à jour", type: "number", width: 110, editable: true },
    { field: "action", headerName: "Actions", renderCell: (params) => <CellActionUserJob {...params} />, width: 300 },
];

export const CellActionUserJob = (props: GridRenderCellParams)=> {
    const { row } = props;
    const buttonElement = React.useRef<HTMLButtonElement>(null);
    const rippleRef = React.useRef<TouchRippleActions>(null);

    return (
        <Box display="flex">
            <CheckUserJob row={row} buttonElement={buttonElement} rippleRef={rippleRef} />
            <ModifyUserJob row={row} buttonElement={buttonElement} rippleRef={rippleRef} />
            <DeleteUserJob row={row} buttonElement={buttonElement} rippleRef={rippleRef} />
        </Box>
    );
}
