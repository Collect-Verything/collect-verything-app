import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { CenteredGrid } from "../../../common/components/grid-centered";

export const Stats = () => {
    return (
        <CenteredGrid>
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
        </CenteredGrid>
    );
};
