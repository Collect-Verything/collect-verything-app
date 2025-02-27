import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Subscription } from "./type";
import { Box, Button } from "@mui/material";
import React from "react";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import {InfoSubscriptionDialog} from "./dialog";

export const columnsConfig: GridColDef<Subscription>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 30,
        align: "center",
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
        align: "center",
        renderCell: (params) => (params.value === true ? "🟢" : "🔴"),
    },
    {
        field: "configured",
        headerName: "Configué",
        width: 100,
        align: "center",
        renderCell: (params) => (params.value === true ? "🟢" : "🔴"),
    },
    {
        field: "published",
        headerName: "Visible",
        width: 80,
        align: "center",
        renderCell: (params) => (params.value === true ? "🟢" : "🔴"),
    },
    {
        field: "current_period_start",
        headerName: "Actif depuis",
        width: 150,
        align: "center",
        renderCell: (params) => new Date(params.value * 1000).toLocaleDateString("fr-FR"),
    },
    {
        field: "current_period_end",
        headerName: "Actif jusqu'au",
        width: 150,
        align: "center",
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
    // Etablir des regles sur l'accessibilité selon configuration etc ...
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
        field: "sub_stripe_id",
        headerName: "Abonnement",
        renderCell: (params) => <CellActionSubscription {...params} />,
        width: 120,
    },
];

export const CellActionSubscription = (props: GridRenderCellParams) => {
    const { row } = props;
    const buttonElement = React.useRef<HTMLButtonElement>(null);
    const rippleRef = React.useRef<TouchRippleActions>(null);

    return (
        <Box display="flex">
            <InfoSubscriptionDialog row={row} buttonElement={buttonElement} rippleRef={rippleRef} />
        </Box>
    );
};
