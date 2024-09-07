import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import {InputsRoundedWithChild, SwitchInputsRoundedWithChild} from "../../common/component/inputs";
import {ButtonRounded} from "../../common/component/buttons";
import React from "react";

export const SolutionPage = () => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            spacing={2}
            sx={{ width: '55%', margin: '0 auto' }}
        >
            <Typography mt={10} variant="h4" fontWeight={800}>
                Démarrez gratuitement, puis profitez d’un tarif de 1 €/mois pendant 3 mois
            </Typography>
            <Typography mt={2} mb={2}  variant="subtitle2">
                Essayez Shopify à moindre coût et sans risque pendant 3 mois.
            </Typography>

            <InputsRoundedWithChild width="162%" >
                <ButtonRounded label="Démarrer un essai" />
            </InputsRoundedWithChild>

            <Typography mt={2} mb={2} variant="subtitle2">
                En saisissant votre e-mail, vous acceptez de recevoir des e-mails de marketing de la part de Shopify.
            </Typography>

            <SwitchInputsRoundedWithChild/>
        </Grid>
    );
};