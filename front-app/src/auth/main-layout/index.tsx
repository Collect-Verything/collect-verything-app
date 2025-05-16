import { Outlet } from "react-router-dom";
import React from "react";
import { Grid } from "@mui/material";
import { SideBar } from "../side-bar";

export const AuthMainLayout = () => {
    return (
        <Grid container>
            <SideBar />
            <Outlet />
        </Grid>
    );
};
