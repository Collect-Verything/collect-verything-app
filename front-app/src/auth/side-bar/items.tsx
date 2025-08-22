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
import { ROLE_NAME } from "../../common/const/user";
import { ButtonMenuDashboard } from "../../shop/component/buttons";
import { Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { SECTION_NAME } from "../../common/const/section";
import { PATH_NAME } from "../../common/const/path";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const UserItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: SECTION_NAME.DASHBOARD,
        url: PATH_NAME.DASHBOARD,
    },
    {
        icon: <PersonIcon />,
        label: SECTION_NAME.ACCOUNT,
        url: PATH_NAME.ACCOUNT,
    },
    {
        icon: <PointOfSaleIcon />,
        label: SECTION_NAME.FACTURATION,
        url: PATH_NAME.FACTURATION,
    },
    {
        icon: <DisplaySettingsIcon />,
        label: SECTION_NAME.CONFIG_SERVICE,
        url: PATH_NAME.CONFIG,
    },
    {
        icon: <SupportAgentIcon />,
        label: SECTION_NAME.SUPPORT,
        url: PATH_NAME.SUPPORT,
    },
    {
        icon: <ImportContactsIcon />,
        label: SECTION_NAME.DOC,
        url: PATH_NAME.DOC,
    },
];

// TODO : Add theme section to personnalize theme web site and modify theme context mui

export const SuperAdminItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: SECTION_NAME.DASHBOARD,
        url: PATH_NAME.DASHBOARD,
    },
    {
        icon: <PersonIcon />,
        label: SECTION_NAME.ACCOUNT,
        url: PATH_NAME.ACCOUNT,
    },
    {
        icon: <CategoryIcon />,
        label: SECTION_NAME.PRODUCTS,
        url: PATH_NAME.PRODUCTS,
    },
    {
        icon: <PointOfSaleIcon />,
        label: SECTION_NAME.FACTURATION,
        url: PATH_NAME.FACTURATION,
    },
    {
        icon: <LocalShippingIcon />,
        label: SECTION_NAME.DELIVERY,
        url: PATH_NAME.DELIVERY,
    },
    {
        icon: <Diversity2Icon />,
        label: SECTION_NAME.GESTION_PERSON,
        url: PATH_NAME.GESTION_PERSON,
    },
    {
        icon: <ConnectWithoutContactIcon />,
        label: SECTION_NAME.GESTION_CUSTOMER,
        url: PATH_NAME.GESTION_CUSTOMER,
    },
    {
        icon: <SignalCellularAltIcon />,
        label: SECTION_NAME.STATS,
        url: PATH_NAME.STATS,
    },
    {
        icon: <SupportAgentIcon />,
        label: SECTION_NAME.SUPPORT,
        url: PATH_NAME.SUPPORT,
    },
    {
        icon: <ImportContactsIcon />,
        label: SECTION_NAME.DOC,
        url: PATH_NAME.DOC,
    },
];

/*
 * Chaque job possede une mission particuliere mais possede a un accées a la documentation pour creer de la ressource selon les problemtaique metiers recontré
 * */

export const InvoiceItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: SECTION_NAME.DASHBOARD,
        url: PATH_NAME.DASHBOARD,
    },
    {
        icon: <PersonIcon />,
        label: SECTION_NAME.ACCOUNT,
        url: PATH_NAME.ACCOUNT,
    },
    {
        icon: <PointOfSaleIcon />,
        label: SECTION_NAME.FACTURATION,
        url: PATH_NAME.FACTURATION,
    },
    {
        icon: <LocalShippingIcon />,
        label: SECTION_NAME.DELIVERY,
        url: PATH_NAME.DELIVERY,
    },
    {
        icon: <SignalCellularAltIcon />,
        label: SECTION_NAME.STATS,
        url: PATH_NAME.STATS,
    },
    {
        icon: <ImportContactsIcon />,
        label: SECTION_NAME.DOC,
        url: PATH_NAME.DOC,
    },
];

export const SupportItemsDashboard: UserItemsDashboardType[] = [
    {
        icon: <DashboardIcon />,
        label: SECTION_NAME.DASHBOARD,
        url: PATH_NAME.DASHBOARD,
    },
    {
        icon: <PersonIcon />,
        label: SECTION_NAME.ACCOUNT,
        url: PATH_NAME.ACCOUNT,
    },
    {
        icon: <SignalCellularAltIcon />,
        label: SECTION_NAME.STATS,
        url: PATH_NAME.STATS,
    },
    {
        icon: <SupportAgentIcon />,
        label: SECTION_NAME.SUPPORT,
        url: PATH_NAME.SUPPORT,
    },
    {
        icon: <ImportContactsIcon />,
        label: SECTION_NAME.DOC,
        url: PATH_NAME.DOC,
    },
];
// export const InvoiceItemsDashboard = SuperAdminItemsDashboard.filter(
//     (item) => item.url !== "support" && item.url !== "customer" && item.url !== "job",
// );
// export const SupportItemsDashboard = SuperAdminItemsDashboard.filter(
//     (item) => item.url !== "facturation" && item.url !== "customer" && item.url !== "job",
// );

interface DisplayMenuDependingJobProps {
    role: ROLE_NAME;
    option: "with-label" | "only-icon";
}

export const DisplayMenuDependingJob = ({ role, option }: DisplayMenuDependingJobProps) => {
    let listItemsMenu;
    if (role === ROLE_NAME.SUPER_ADMIN) {
        listItemsMenu = SuperAdminItemsDashboard;
    }
    if (role === ROLE_NAME.INVOICE) {
        listItemsMenu = InvoiceItemsDashboard;
    }
    if (role === ROLE_NAME.SUPPORT) {
        listItemsMenu = SupportItemsDashboard;
    }
    if (role === ROLE_NAME.USER) {
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
