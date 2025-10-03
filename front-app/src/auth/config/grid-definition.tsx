import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Subscription } from "./type";
import { Box, Button } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { InfoSubscriptionDialog } from "./dialogs/sub-info";
// import { ConfigDialog } from "./dialogs/config";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

export const columnsConfig: GridColDef<Subscription>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 30,
        align: "center",
        renderCell: (params) => params.value,
    },
    {
        field: "configuration.url",
        headerName: "Url",
        width: 180,
        renderCell: (params) => {
            const url = params.row.configuration?.url;
            return url ? `http://ipserveur/${url}` : "Aucune Url définie pour le moment";
        },
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
        headerName: "Publié",
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
        renderCell: (params) => <CellActionConfig {...params} />,
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

export const CellActionConfig = (props: GridRenderCellParams) => {
    // const { row } = props;
    // const buttonElement = React.useRef<HTMLButtonElement>(null);
    // const rippleRef = React.useRef<TouchRippleActions>(null);

    return (
        <Box display="flex">
            <Button href="http://82.165.44.233/">
                <SettingsApplicationsIcon color="secondary" />
            </Button>
            {/*Fix For demo*/}
            {/*<ConfigDialog row={row} buttonElement={buttonElement} rippleRef={rippleRef} />*/}
        </Box>
    );
};
