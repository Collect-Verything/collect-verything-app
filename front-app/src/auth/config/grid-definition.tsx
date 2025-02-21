import { GridColDef } from "@mui/x-data-grid";
import { Subscription } from "./type";
import {Button, Typography} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React from "react";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Les bool :
// - active_stripe
// - configured
// - published
// Seront representé par des points rouge ou vert selon l'etat

export const columnsConfig: GridColDef<Subscription>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 30,
        align: 'center',
        renderCell: (params) => params.value,
    },
    {
        field: "",
        headerName: "Url",
        width: 180,
        renderCell: () => "Url du site web subscription.config.domain",
    },
    {
        field: "active_stripe",
        headerName: "Contrat actif",
        width: 100,
        align: 'center',
        renderCell: (params) => params.value === true ?"🟢": "🔴",
    },
    {
        field: "configured",
        headerName: "Configué",
        width: 100,
        align: 'center',
        renderCell: (params) => params.value === true ?"🟢": "🔴",
    },
    {
        field: "published",
        headerName: "Visible",
        width: 80,
        align: 'center',
        renderCell: (params) => params.value === true ?"🟢": "🔴",
    },
    {
        field: "current_period_start",
        headerName: "Actif depuis",
        width: 150,
        align: 'center',
        renderCell: (params) => new Date(params.value * 1000).toLocaleDateString("fr-FR"),
    },
    {
        field: "current_period_end",
        headerName: "Actif jusqu'au",
        width: 150,
        align: 'center',
        renderCell: (params) => new Date(params.value * 1000).toLocaleDateString("fr-FR"),
    },
    {
        field: "b",
        headerName: "Configuration",
        width: 120,
        renderCell: () => {
            return (
                <Button>
                    <SettingsApplicationsIcon color="secondary" />
                </Button>
            );
        },
    },
    {
        field: "c",
        headerName: "Consulter",
        width: 120,
        renderCell: () => {
            return (
                <Button>
                    <VisibilityIcon color="secondary" />
                </Button>
            );
        },
    },
    {
        field: "d",
        headerName: "Abonnement",
        width: 120,
        renderCell: () => {
            return (
                <Button>
                    <ReceiptIcon color="secondary" />
                </Button>
            );
        },
    },
];
