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
