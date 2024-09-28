import { Outlet } from "react-router-dom";
import React from "react";
import { Grid2 } from "@mui/material";
import { SideBar } from "../side-bar";

export const AuthMainLayout = () => {
    return (
        <Grid2 container>
            <SideBar />
            <Outlet />
        </Grid2>
    );
};
