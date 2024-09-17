import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import React from "react";
import { PRODUCT_FORMULA } from "./const";

interface SolutionUnitProductProps {
  formula: string;
}

export const SolutionUnitProduct = ({ formula }: SolutionUnitProductProps) => {
  return (
    <Box
      sx={{
        width: "280px",
        position: "relative",
        borderRadius: "14px",
        background: "white",
        zIndex: 1,
        textAlign: "left",
        border: "1px solid #E7E6F6",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "14px",
          padding: "2px",
          background: "linear-gradient( #E7E6F6, silver)",
          "-webkit-mask":
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          zIndex: -1,
        },
      }}
    >
      {/* Grids avec le texte */}
      <Grid container spacing={2} padding={2} pt={5} pb={5}>
        <Grid>
          <Typography variant="subtitle2">
            Taux de carte à partir de :
          </Typography>
          <Typography variant="subtitle2">
            • 1,8 % + 0,25 € EUR en ligne
          </Typography>
        </Grid>

        <Grid>
          <Typography variant="subtitle2" mt={2}>
            Principales fonctionnalités :
          </Typography>
          <Typography variant="subtitle2">• Le processus optimisé</Typography>
          <Typography variant="subtitle2">
            • Analyses de données standard
          </Typography>
          <Typography variant="subtitle2">
            • 10 emplacements des stocks
          </Typography>
          <Typography variant="subtitle2">
            • Assistance par chat à tout moment
          </Typography>
          <Typography variant="subtitle2">• Vente globale localisée</Typography>
          <Typography variant="subtitle2">• Stockage serveur 2go</Typography>
        </Grid>

        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            borderTop: "2px solid #d9d7f5",
            borderBottom: "2px solid #d9d7f5",
            textAlign: "center",
            pt: 3,
            pb: 3,
            mt: 9,
            top: "150px",
            backgroundColor: "#E7E6F6",
            transform: "translateY(50px)",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Paiement mensuel
          </Typography>
        </Box>
        <Grid mt={9}>
          <Typography variant="subtitle2" color="black">
            • Le processus optimisé
          </Typography>
          <Typography variant="subtitle2" color="black">
            • Analyses de données standard
          </Typography>
          <Typography
            variant="subtitle2"
            color={
              formula === PRODUCT_FORMULA.PREMIUM ||
              formula === PRODUCT_FORMULA.MEDIUM
                ? "black"
                : "grey"
            }
          >
            • 10 emplacements des stocks
          </Typography>
          <Typography
            variant="subtitle2"
            color={
              formula === PRODUCT_FORMULA.PREMIUM ||
              formula === PRODUCT_FORMULA.MEDIUM
                ? "black"
                : "grey"
            }
          >
            • Vente globale localisée
          </Typography>
          <Typography
            variant="subtitle2"
            color={formula === PRODUCT_FORMULA.PREMIUM ? "black" : "grey"}
          >
            • Stockage serveur 2go
          </Typography>
          <Typography
            variant="subtitle2"
            color={formula === PRODUCT_FORMULA.PREMIUM ? "black" : "grey"}
          >
            • Assistance par chat à tout moment
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          position: "absolute",
          top: "-14px",
          left: "calc(50% - 75px)",
          background: "linear-gradient(to right, #E7E6F6, #d9d7f5)",
          borderRadius: "16px",
          width: "150px",
          height: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {formula}
        </Typography>
      </Box>
    </Box>
  );
};
