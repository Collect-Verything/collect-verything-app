import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import {ButtonRounded} from "../common/component/buttons";
import React from "react";
import {InputsRoundedWithChild} from "../common/component/inputs";

export const HomePage = () => {
    return (
        <Grid container justifyContent="center">
            <Grid
                container
                spacing={5}
                alignItems="center"
                borderRadius={15}
                pr={5}
                pl={5}
                pt={1}
                pb={1}
                mt={10}
                bgcolor='rgba(204, 203, 237, 0.8)'
                width='90%'
                justifyContent='center'
                border='1px solid rgba(204, 203, 237, 0.5)'
                boxShadow='0 0 15px rgba(0, 0, 0, 0.2)'
                sx={{
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Grid width="35%" textAlign="left">
                    <Typography fontWeight={600} variant="h3">
                        La plateforme de commerce internationale
                    </Typography>
                    <Typography variant="subtitle2" mt={2} mb={2}>
                        Créez votre entreprise avec Click & Machin pour vendre en ligne, hors ligne et partout où se trouvent vos clients.
                    </Typography>
                    <InputsRoundedWithChild>
                        <ButtonRounded label="Démarer un essai"/>
                    </InputsRoundedWithChild>
                </Grid>
                <Grid>
                    <img width={500} src={`${process.env.PUBLIC_URL}/assets/illustrations/home-1.png`} alt="Illustration"/>
                </Grid>
            </Grid>
        </Grid>
    )
}