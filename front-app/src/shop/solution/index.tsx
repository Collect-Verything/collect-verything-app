import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { InputsRoundedWithChild, SwitchInputsRoundedWithChild } from "../../common/component/inputs";
import { ButtonRounded } from "../../common/component/buttons";
import React from "react";
import { SolutionUnitProduct } from "../../common/component/solution";
import { PRODUCT_FORMULA } from "../../common/component/solution/const";

export const SolutionPage = () => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            spacing={2}
            sx={{ width: "70%", margin: "0 auto" }}
        >
            <Typography mt="10vh" variant="h4" fontWeight={800}>
                Démarrez gratuitement, puis profitez d’un tarif de 1 €/mois pendant 3 mois
            </Typography>
            <Typography mt="3vh" mb="3vh" variant="subtitle2">
                Essayez Shopify à moindre coût et sans risque pendant 3 mois.
            </Typography>

            <InputsRoundedWithChild width="176%">
                <ButtonRounded label="Démarrer un essai" />
            </InputsRoundedWithChild>

            <Typography mt="3vh" mb="3vh" variant="subtitle2">
                En saisissant votre e-mail, vous acceptez de recevoir des e-mails de marketing de la part de Shopify.
            </Typography>

            <SwitchInputsRoundedWithChild />

            <Grid container spacing={6} mt="5vh" pt={5}>
                {[PRODUCT_FORMULA.STANDARD, PRODUCT_FORMULA.MEDIUM, PRODUCT_FORMULA.PREMIUM].map((formula, index) => (
                    <SolutionUnitProduct key={index} formula={formula} />
                ))}
            </Grid>
        </Grid>
    );
};
