import React from "react";
import { Box, Grid2, Paper, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
/*
 * Les composant documentation sont pour le moment commun à un user comme a un super admin ou metier concerné.
 * If user get all documentation
 * If metier or super adinm get all documentation avec possibilité de modififer ou supprimer + rajouter un composant de redaction de documentation
 * Trouver un moyen de rendre commun le composant mais de changer le type de d'action dans le display du tableau selon le role detecté
 * */
export const Documentation = () => {
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
                    <ArticleIcon sx={{ fontSize: 56, color: "text.secondary" }} />
                </Box>

                <Typography variant="h6" gutterBottom>
                    Aucune documentation pour l’instant
                </Typography>
            </Paper>
        </Grid2>
    );
};
