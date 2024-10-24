import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

export const AuthDashboard = () => {
    const { role, firstname, lastname } = useSelector((store: any) => store.authenticate);

    return (
        <>
            <Typography>
                Bonjour {firstname} {lastname}
            </Typography>
            <Typography>{role}</Typography>
            <Typography>main dash board</Typography>;
        </>
    );
};
