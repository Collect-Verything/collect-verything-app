import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Grid2, Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NoBills = () => {
    const nav = useNavigate();

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
                    <ReceiptLongIcon sx={{ fontSize: 56, color: "text.secondary" }} />
                </Box>

                <Typography variant="h6" gutterBottom>
                    Aucune facture pour l’instant
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={4}>
                    Dès que vous effectuerez un achat, vos factures apparaîtront ici.
                </Typography>

                <Button variant="contained" color="secondary" disableElevation onClick={() => nav("/catalogue")}>
                    Découvrir les offres
                </Button>
            </Paper>
        </Grid2>
    );
};
