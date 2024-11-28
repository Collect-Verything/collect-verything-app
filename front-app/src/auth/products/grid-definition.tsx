import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { Box } from "@mui/material";
import { ProductEntity } from "../../shop/boutique/type";
import { CheckProduct } from "./dialogs/check-product";
import { DeleteProduct } from "./dialogs/delete-product";
import { ModifyProduct } from "./dialogs/modify-product";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const columnsProduct: GridColDef<ProductEntity>[] = [
    { field: "id", headerName: "Id", width: 30 },
    // TODO : Afficher l'image
    { field: "picture_path", headerName: "Image Url", width: 90 },
    { field: "name", headerName: "Nom", width: 90 },
    { field: "title", headerName: "Titre", width: 90 },
    { field: "description", headerName: "Desc", width: 100 },
    { field: "details", headerName: "Details", width: 190 },
    { field: "type", headerName: "Type", width: 110 },
    { field: "stock", headerName: "Stock", width: 70 },
    { field: "price", headerName: "Prix", width: 70 },
    {
        field: "published",
        headerName: "Visible",
        width: 70,
        renderCell: (params) => (params.value ? <VisibilityIcon /> : <VisibilityOffIcon />),
    },

    { field: "createdAt", headerName: "Date création", width: 150 },
    { field: "updatedAt", headerName: "Date mise à jour", width: 110 },
    { field: "action", headerName: "Actions", renderCell: (params) => <CellActionUserJob {...params} />, width: 300 },
];

export const CellActionUserJob = (props: GridRenderCellParams) => {
    const { row } = props;
    const buttonElement = React.useRef<HTMLButtonElement>(null);
    const rippleRef = React.useRef<TouchRippleActions>(null);

    return (
        <Box display="flex">
            <CheckProduct row={row} buttonElement={buttonElement} rippleRef={rippleRef} />
            <ModifyProduct row={row} buttonElement={buttonElement} rippleRef={rippleRef} />
            <DeleteProduct row={row} buttonElement={buttonElement} rippleRef={rippleRef} />
        </Box>
    );
};
