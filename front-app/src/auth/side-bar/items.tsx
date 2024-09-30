import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import React from "react";
import { UserItemsDashboardType } from "./types";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { ROLES } from "../../common/const";
import { ButtonMenuDashboard } from "../../common/component/buttons";
import { Typography } from "@mui/material";

export const UserItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: "Tableau de bord",
        url: "",
    },
    {
        icon: <PersonIcon />,
        label: "Compte",
        url: "account",
    },
    {
        icon: <PointOfSaleIcon />,
        label: "Facturation",
        url: "facturation",
    },
    {
        icon: <DisplaySettingsIcon />,
        label: "Configuration solution",
        url: "config",
    },
    {
        icon: <SupportAgentIcon />,
        label: "Service client",
        url: "support",
    },
    {
        icon: <ImportContactsIcon />,
        label: "Documentation",
        url: "doc",
    },
];

export const SuperAdminItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: "Tableau de bord",
        url: "",
    },
    {
        icon: <PersonIcon />,
        label: "Compte",
        url: "account",
    },
    {
        icon: <PointOfSaleIcon />,
        label: "Facturation",
        url: "facturation",
    },
    {
        icon: <Diversity2Icon />,
        label: "Gestion du personnel",
        url: "job",
    },
    {
        icon: <ConnectWithoutContactIcon />,
        label: "Gestion client",
        url: "customer",
    },
    {
        icon: <SignalCellularAltIcon />,
        label: "Statistique",
        url: "stats",
    },
    {
        icon: <SupportAgentIcon />,
        label: "Service client",
        url: "support",
    },
    {
        icon: <ImportContactsIcon />,
        label: "Documentation",
        url: "doc",
    },
];

/*
 * Chaque job possede une mission particuliere mais possede a un accées a la documentation pour creer de la ressource selon les problemtaique metiers recontré
 * */

export const InvoiceItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: "Tableau de bord",
        url: "",
    },
    {
        icon: <PersonIcon />,
        label: "Compte",
        url: "account",
    },
    {
        icon: <PointOfSaleIcon />,
        label: "Facturation",
        url: "facturation",
    },
    {
        icon: <SignalCellularAltIcon />,
        label: "Statistique",
        url: "stats",
    },
    {
        icon: <ImportContactsIcon />,
        label: "Documentation",
        url: "doc",
    },
];

export const SupportItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: "Tableau de bord",
        url: "",
    },
    {
        icon: <PersonIcon />,
        label: "Compte",
        url: "account",
    },
    {
        icon: <SignalCellularAltIcon />,
        label: "Statistique",
        url: "stats",
    },
    {
        icon: <SupportAgentIcon />,
        label: "Service client",
        url: "support",
    },
    {
        icon: <ImportContactsIcon />,
        label: "Documentation",
        url: "doc",
    },
];
// export const InvoiceItemsDashboard = SuperAdminItemsDashboard.filter(
//     (item) => item.url !== "support" && item.url !== "customer" && item.url !== "job",
// );
// export const SupportItemsDashboard = SuperAdminItemsDashboard.filter(
//     (item) => item.url !== "facturation" && item.url !== "customer" && item.url !== "job",
// );

interface DisplayMenuDependingJobProps {
    role: ROLES;
    option: "with-label" | "only-icon";
}

export const DisplayMenuDependingJob = ({ role, option }: DisplayMenuDependingJobProps) => {
    let listItemsMenu;
    if (role === ROLES.SUPER_ADMIN) {
        listItemsMenu = SuperAdminItemsDashboard;
    }
    if (role === ROLES.INVOICE) {
        listItemsMenu = InvoiceItemsDashboard;
    }
    if (role === ROLES.SUPPORT) {
        listItemsMenu = SupportItemsDashboard;
    }
    if (role === ROLES.USER) {
        listItemsMenu = UserItemsDashboard;
    }

    if (listItemsMenu && option === "only-icon") {
        return (
            <>
                {listItemsMenu.map((item) => (
                    <ButtonMenuDashboard url={item.url} key={item.label}>
                        {item.icon}
                    </ButtonMenuDashboard>
                ))}
            </>
        );
    }
    if (listItemsMenu && option === "with-label") {
        return (
            <>
                {listItemsMenu.map((item) => (
                    <ButtonMenuDashboard url={item.url} key={item.label}>
                        {item.icon}
                        <Typography>{item.label}</Typography>
                    </ButtonMenuDashboard>
                ))}
            </>
        );
    }

    return <p>Role undefined</p>;
};
