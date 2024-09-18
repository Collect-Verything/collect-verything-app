import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { SwitchInputsRoundedWithChild } from "../../common/component/inputs";
import { ButtonRounded } from "../../common/component/buttons";
import { Link } from "react-router-dom";

export const Tarification = () => {
    const [selected, setSelected] = useState<number>(2);

    return (
        <Grid container mt={10} display="flex" flexDirection="column" alignContent="center" justifyContent="center">
            <Grid container alignContent="center" justifyContent="center" sx={{ "&:hover": { cursor: "pointer" } }}>
                <Grid
                    width="33%"
                    height="30px"
                    onClick={() => setSelected(1)}
                    sx={{
                        background: selected === 1 ? "linear-gradient(to bottom, white, #E7E6F6)" : "",
                        borderRadius: "30px 0px 0px 5px",
                    }}
                >
                    <Typography fontWeight={selected === 1 ? 600 : 0} textAlign="center">
                        Regular
                    </Typography>
                </Grid>
                <Grid
                    width="34%"
                    height="30px"
                    onClick={() => setSelected(2)}
                    sx={{
                        background: selected === 2 ? "linear-gradient(to bottom, white, #E7E6F6)" : "",
                    }}
                    borderRadius="0px 0px 0px 0px"
                >
                    <Typography fontWeight={selected === 2 ? 600 : 0} textAlign="center">
                        Medium
                    </Typography>
                </Grid>
                <Grid
                    width="33%"
                    height="30px"
                    onClick={() => setSelected(3)}
                    sx={{
                        background: selected === 3 ? "linear-gradient(to bottom, white, #E7E6F6)" : "",
                    }}
                    borderRadius="0px 30px 5px 0px"
                >
                    <Typography fontWeight={selected === 3 ? 600 : 0} textAlign="center">
                        Premium
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                textAlign="center"
                border="3px solid #E7E6F6"
                width="45%"
                padding="20px 20px 20px 20px"
                borderRadius="0px 0px 10px 10px"
                marginTop="-2px"
                alignContent="center"
                justifyContent="center"
            >
                <Typography variant="h4" mt={3} mb={2}>
                    Conçu pour l’extensibilité
                </Typography>
                <Typography variant="subtitle2" mb={3}>
                    Évoluez rapidement avec notre boutique en ligne personnalisable, ou construisez la vôtre avec la
                    technologie qui vous plaît pour une liberté créative totale. Mieux encore, intégrez vos systèmes
                    tiers via les API de notre écosystème d’applications.
                </Typography>

                <SwitchInputsRoundedWithChild />

                <Typography variant="subtitle2" mt={3}>
                    1,8 % + 0,25 € EUR en ligne
                </Typography>
                <Typography variant="subtitle2">Le processus optimisé</Typography>
                <Typography variant="subtitle2">Analyses de données standard</Typography>
                <Typography variant="subtitle2">10 emplacements des stocks</Typography>
                <Typography variant="subtitle2">Assistance par chat à tout moment</Typography>
                <Typography variant="subtitle2">Vente globale localisée</Typography>
                <Typography variant="subtitle2">Stockage serveur 2go</Typography>
                <Link to={`/basket/${selected}`}>
                    <ButtonRounded mt={3} mb={4} label={"Ajouter au panier"} />
                </Link>
            </Grid>
        </Grid>
    );
};
