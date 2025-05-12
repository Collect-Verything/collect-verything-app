import React from "react";
import { Box, Grid2, Paper, Typography } from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export const Stats = () => {
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
            <Paper
                elevation={3}
                sx={{
                    px: 6,
                    py: 8,
                    maxWidth: 420,
                    textAlign: "center",
                    borderRadius: 4,
                }}
            >
                <Box display="flex" justifyContent="center" mb={2}>
                    <SignalCellularAltIcon sx={{ fontSize: 56, color: "text.secondary" }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                    Pas de statistique pour le moment
                </Typography>
            </Paper>
        </Grid2>
    );
};
