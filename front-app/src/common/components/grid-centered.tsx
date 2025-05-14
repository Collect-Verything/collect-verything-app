import { Grid2 } from "@mui/material";
import React, { ReactNode } from "react";

interface CenteredGridProps {
    children: ReactNode;
}
export const CenteredGrid = ({ children }: CenteredGridProps) => {
    return (
        <Grid2
            container
            direction="column"
            margin="auto"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            minHeight="100vh"
        >
            {children}
        </Grid2>
    );
};
