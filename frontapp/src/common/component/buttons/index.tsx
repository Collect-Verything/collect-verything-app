import Grid from "@mui/material/Grid2";
import React from "react";

interface ButtonRoundedProps {
    label: string;
}

export const ButtonRounded = ({label}: ButtonRoundedProps) => {
    return (
        <Grid bgcolor="black" color="white" padding={1} pl={2} pr={2} borderRadius={15}>
            {label}
        </Grid>
    )
}