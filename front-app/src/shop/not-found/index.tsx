import React from "react";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UndoIcon from "@mui/icons-material/Undo";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { BackgroundBlurPng } from "../../common/styles/bg-blur";

export default function Error404Page() {
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
            <BackgroundBlurPng url="assets/illustrations/404.png" blur="0" />

            <Paper
                elevation={3}
                sx={{
                    px: 6,
                    py: 8,
                    maxWidth: 420,
                    textAlign: "center",
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0)",
                }}
            >
                <Box display="flex" justifyContent="center" mb={2}>
                    <AnnouncementIcon sx={{ fontSize: 56, color: "white" }} />
                </Box>

                <Typography color="white" variant="h6" gutterBottom>
                    404
                </Typography>
                <Typography color="white" variant="h6" gutterBottom>
                    T'essaies de me niquer ?
                </Typography>

                <Button>
                    <Link to="/" className="flex items-center gap-2">
                        <UndoIcon /> Retour à l'accueil
                    </Link>
                </Button>
            </Paper>
        </Grid2>
    );
}
