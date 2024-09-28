import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { Grid2, Typography } from "@mui/material";
import { PRIMARY_COLOR } from "../../common/styles/theme";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import Grid from "@mui/material/Grid2";

export const SideBar = () => {
    const [sideBar, setSideBar] = useState(true);

    const handleSideBar = () => {
        setSideBar(!sideBar);
    };

    return (
        <Grid2 width={sideBar ? "20vw" : "5vw"} height="100vh" sx={{ backgroundColor: PRIMARY_COLOR }}>
            <Grid pl={sideBar ? 15 : 0}>
                <Link to="/">
                    <img
                        style={{ paddingTop: 20 }}
                        width={80}
                        src={`${process.env.PUBLIC_URL}/assets/logo/logo-header.png`}
                        alt="Favicon"
                    />
                </Link>
            </Grid>

            {sideBar ? (
                <Grid pl={18}>
                    <ArrowBackIosNewIcon onClick={handleSideBar} />
                </Grid>
            ) : (
                <Grid pl={3}>
                    <ArrowForwardIosIcon onClick={handleSideBar} />
                </Grid>
            )}

            {sideBar ? (
                <Grid2 display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <ButtonMenuDashboard>
                        <DashboardIcon />
                        <Typography>Tableau de bord</Typography>
                    </ButtonMenuDashboard>
                    <ButtonMenuDashboard>
                        <PersonIcon />
                        <Typography>Compte</Typography>
                    </ButtonMenuDashboard>
                    <ButtonMenuDashboard>
                        <PointOfSaleIcon />
                        <Typography>Facturation</Typography>
                    </ButtonMenuDashboard>
                    <ButtonMenuDashboard>
                        <DisplaySettingsIcon />
                        <Typography>Parametrage solution</Typography>
                    </ButtonMenuDashboard>
                    <ButtonMenuDashboard>
                        <SupportAgentIcon />
                        <Typography>Service client</Typography>
                    </ButtonMenuDashboard>
                    <ButtonMenuDashboard>
                        <ImportContactsIcon />
                        <Typography>Documentation</Typography>
                    </ButtonMenuDashboard>
                </Grid2>
            ) : (
                <Grid2 display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <DashboardIcon />
                    <PersonIcon />
                    <PointOfSaleIcon />
                    <DisplaySettingsIcon />
                    <SupportAgentIcon />
                    <ImportContactsIcon />
                </Grid2>
            )}
        </Grid2>
    );
};

interface ButtonMenuDashboardProps {
    children: React.ReactNode;
}

export const ButtonMenuDashboard = ({ children }: ButtonMenuDashboardProps) => {
    return (
        <Grid2
            container
            spacing={2}
            sx={{
                "&:hover": {
                    cursor: "pointer",
                    color: "gray",
                },
            }}
        >
            {children}
        </Grid2>
    );
};

export const AuthMainLayout = () => {
    return (
        <Grid2 container>
            <SideBar />
            <Outlet />
        </Grid2>
    );
};
