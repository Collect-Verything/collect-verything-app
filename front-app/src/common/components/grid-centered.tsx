import { Grid } from "@mui/material";
import React, { ReactNode } from "react";

interface CenteredGridProps {
    children: ReactNode;
}
export const CenteredGrid = ({ children }: CenteredGridProps) => {
    return (
        <Grid
            container
            direction="column"
            margin="auto"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            minHeight="100vh"
        >
            {children}
        </Grid>
    );
};
