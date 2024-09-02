import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import {ButtonRounded} from "../common/component/buttons";
import React from "react";
import {InputsRoundedWithChild} from "../common/component/inputs";
import TagIcon from '@mui/icons-material/Tag';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EqualizerIcon from '@mui/icons-material/Equalizer';

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
                justifyContent='center'
                sx={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/illustrations/home-bg-1.png)`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
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

            <Grid
                container
                spacing={5}
                alignItems="center"
                pr={5}
                pl={5}
                pt={1}
                pb={1}
                mt={10}
                width='90%'
                justifyContent='center'
            >
                <Grid>
                    <img width={500} src={`${process.env.PUBLIC_URL}/assets/illustrations/home-2.png`} alt="Illustration"/>
                </Grid>
                <Grid width="35%" textAlign="center">
                    <Typography fontWeight={600} variant="h4">
                        Un point de vente flexible et click and collect pour propulser votre magasin
                    </Typography>
                    <Typography variant="subtitle2" mt={4} mb={4}>
                        Un système point de vente click and collectpermettant aux clients d’effectuer leurs achats de façon flexible, en ligne ou en magasin. </Typography>
                    <ButtonRounded label="Découvrir"/>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={5}
                alignItems="center"
                pr={5}
                pl={5}
                pt={1}
                pb={1}
                mt={10}
                justifyContent='center'
                sx={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/illustrations/home-bg-3.png)`,
                    backgroundSize: 'contain',
                }}
            >

                <Grid width="35%" textAlign="left">
                    <Grid container spacing={2} alignItems="center">
                        <TagIcon/>
                        <Typography variant="h5">
                            Touchez de nouveaux client
                        </Typography>
                    </Grid>
                    <Typography variant="subtitle2">
                        Bla bla stat dash board ...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>

                    <Grid container spacing={2} mt={2} alignItems="center">
                        <AlternateEmailIcon/>
                        <Typography variant="h5">
                            Interagissez avec les clients
                        </Typography>
                    </Grid>
                    <Typography variant="subtitle2" mb={2}>
                        Bla bla stat dash board ...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>

                    <Grid container spacing={2} mt={2} alignItems="center">
                        <EqualizerIcon/>
                        <Typography variant="h5">
                            Exploitez les données
                        </Typography>
                    </Grid>
                    <Typography variant="subtitle2">
                        Bla bla stat dash board ...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>

                </Grid>

                <Grid>
                    <img width={500} src={`${process.env.PUBLIC_URL}/assets/illustrations/home-3.png`} alt="Illustration"/>
                </Grid>

            </Grid>
        </Grid>
    )
}