import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Button } from "@mui/material";
import { InvoiceEntity } from "./type";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export const columnsInvoices: GridColDef<InvoiceEntity>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 350,
        renderCell: (params) => params.value.split("_")[1],
    },
    {
        field: "amount",
        headerName: "Montant",
        width: 120,
        renderCell: (params) => params.value / 100 + " €",
    },
    {
        field: "start",
        headerName: "Date",
        width: 200,
        renderCell: (params) => new Date(params.value * 1000).toLocaleDateString("fr-FR"),
    },
    {
        field: "end",
        headerName: "Valable au",
        width: 200,
        renderCell: (params) => new Date(params.value * 1000).toLocaleDateString("fr-FR"),
    },
    {
        field: "invoice_link",
        headerName: "Consulter",
        width: 150,
        renderCell: (params) => {
            return (
                <Button target="blank" href={params.value}>
                    <ZoomInIcon />
                </Button>
            );
        },
    },
    {
        field: "invoice_download",
        headerName: "Telecharger",
        width: 150,
        renderCell: (params) => {
            return (
                <Button href={params.value}>
                    <FileDownloadIcon />
                </Button>
            );
        },
    },
];
