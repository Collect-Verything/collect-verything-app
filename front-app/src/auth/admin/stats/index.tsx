import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import BarChartIcon from "@mui/icons-material/BarChart";
import { StatsGender } from "./gender";

export const Stats = () => {
    return (
        <Box sx={{ height: 700, width: "80%" }} padding={5} margin="auto" marginTop={2}>
            <Grid container justifyContent="space-between" alignItems="center" pb={5} pr={2} pl={2}>
                <Grid>
                    <Typography variant="h4" component="div">
                        <BarChartIcon fontSize="large" /> Statistiques
                    </Typography>
                </Grid>
            </Grid>
            <StatsGender />
        </Box>
    );
};
