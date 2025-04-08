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
import { ROLENAME } from "../../common/const/user";
import { ButtonMenuDashboard } from "../../shop/component/buttons";
import { Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { SECTION_NAME, URL_FRONT } from "../../app/router/const";

export const UserItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: SECTION_NAME.DASHBOARD,
        url: URL_FRONT.DASHBOARD,
    },
    {
        icon: <PersonIcon />,
        label: SECTION_NAME.ACCOUNT,
        url: URL_FRONT.ACCOUNT,
    },
    {
        icon: <PointOfSaleIcon />,
        label: SECTION_NAME.FACTURATION,
        url: URL_FRONT.FACTURATION,
    },
    {
        icon: <DisplaySettingsIcon />,
        label: SECTION_NAME.CONFIG_SERVICE,
        url: URL_FRONT.CONFIG,
    },
    {
        icon: <SupportAgentIcon />,
        label: SECTION_NAME.SUPPORT,
        url: URL_FRONT.SUPPORT,
    },
    {
        icon: <ImportContactsIcon />,
        label: SECTION_NAME.DOC,
        url: URL_FRONT.DOC,
    },
];

// TODO : Add theme section to personnalize theme web site and modify theme context mui

export const SuperAdminItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: SECTION_NAME.DASHBOARD,
        url: URL_FRONT.DASHBOARD,
    },
    {
        icon: <PersonIcon />,
        label: SECTION_NAME.ACCOUNT,
        url: URL_FRONT.ACCOUNT,
    },
    {
        icon: <CategoryIcon />,
        label: SECTION_NAME.PRODUCTS,
        url: URL_FRONT.PRODUCTS,
    },
    {
        icon: <PointOfSaleIcon />,
        label: SECTION_NAME.FACTURATION,
        url: URL_FRONT.FACTURATION,
    },
    {
        icon: <Diversity2Icon />,
        label: SECTION_NAME.GESTION_PERSON,
        url: URL_FRONT.GESTION_PERSON,
    },
    {
        icon: <ConnectWithoutContactIcon />,
        label: SECTION_NAME.GESTION_CUSTOMER,
        url: URL_FRONT.GESTION_CUSTOMER,
    },
    {
        icon: <SignalCellularAltIcon />,
        label: SECTION_NAME.STATS,
        url: URL_FRONT.STATS,
    },
    {
        icon: <SupportAgentIcon />,
        label: SECTION_NAME.SUPPORT,
        url: URL_FRONT.SUPPORT,
    },
    {
        icon: <ImportContactsIcon />,
        label: SECTION_NAME.DOC,
        url: URL_FRONT.DOC,
    },
];

/*
 * Chaque job possede une mission particuliere mais possede a un accées a la documentation pour creer de la ressource selon les problemtaique metiers recontré
 * */

export const InvoiceItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: SECTION_NAME.DASHBOARD,
        url: URL_FRONT.DASHBOARD,
    },
    {
        icon: <PersonIcon />,
        label: SECTION_NAME.ACCOUNT,
        url: URL_FRONT.ACCOUNT,
    },
    {
        icon: <PointOfSaleIcon />,
        label: SECTION_NAME.FACTURATION,
        url: URL_FRONT.FACTURATION,
    },
    {
        icon: <SignalCellularAltIcon />,
        label: SECTION_NAME.STATS,
        url: URL_FRONT.STATS,
    },
    {
        icon: <ImportContactsIcon />,
        label: SECTION_NAME.DOC,
        url: URL_FRONT.DOC,
    },
];

export const SupportItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: SECTION_NAME.DASHBOARD,
        url: URL_FRONT.DASHBOARD,
    },
    {
        icon: <PersonIcon />,
        label: SECTION_NAME.ACCOUNT,
        url: URL_FRONT.ACCOUNT,
    },
    {
        icon: <SignalCellularAltIcon />,
        label: SECTION_NAME.STATS,
        url: URL_FRONT.STATS,
    },
    {
        icon: <SupportAgentIcon />,
        label: SECTION_NAME.SUPPORT,
        url: URL_FRONT.SUPPORT,
    },
    {
        icon: <ImportContactsIcon />,
        label: SECTION_NAME.DOC,
        url: URL_FRONT.DOC,
    },
];
// export const InvoiceItemsDashboard = SuperAdminItemsDashboard.filter(
//     (item) => item.url !== "support" && item.url !== "customer" && item.url !== "job",
// );
// export const SupportItemsDashboard = SuperAdminItemsDashboard.filter(
//     (item) => item.url !== "facturation" && item.url !== "customer" && item.url !== "job",
// );

interface DisplayMenuDependingJobProps {
    role: ROLENAME;
    option: "with-label" | "only-icon";
}

export const DisplayMenuDependingJob = ({ role, option }: DisplayMenuDependingJobProps) => {
    let listItemsMenu;
    if (role === ROLENAME.SUPER_ADMIN) {
        listItemsMenu = SuperAdminItemsDashboard;
    }
    if (role === ROLENAME.INVOICE) {
        listItemsMenu = InvoiceItemsDashboard;
    }
    if (role === ROLENAME.SUPPORT) {
        listItemsMenu = SupportItemsDashboard;
    }
    if (role === ROLENAME.USER) {
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
