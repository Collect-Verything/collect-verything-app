import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { ButtonRounded } from "../component/buttons";
import React from "react";
import { InputsRoundedWithChild } from "../component/inputs";
import TagIcon from "@mui/icons-material/Tag";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { PRIMARY_COLOR } from "../../common/styles/theme";

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
                mt={12}
                justifyContent="center"
                width="1300px"
                sx={{
                    backgroundColor: PRIMARY_COLOR,
                }}
            >
                <Grid width="35%" textAlign="left">
                    <Typography fontWeight={600} variant="h3">
                        La plateforme de commerce internationale
                    </Typography>
                    <Typography variant="subtitle2" mt={2} mb={2}>
                        Créez votre entreprise avec Click & Machin pour vendre en ligne, hors ligne et partout où se
                        trouvent vos clients.
                    </Typography>
                    <InputsRoundedWithChild width="174%">
                        <ButtonRounded label="Démarer un essai" />
                    </InputsRoundedWithChild>
                </Grid>
                <Grid>
                    <img
                        width={500}
                        src={`${process.env.PUBLIC_URL}/assets/illustrations/home-1.png`}
                        alt="Illustration"
                    />
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
                mt={20}
                width="90%"
                justifyContent="center"
            >
                <Grid>
                    <img
                        width={500}
                        src={`${process.env.PUBLIC_URL}/assets/illustrations/home-2.png`}
                        alt="Illustration"
                    />
                </Grid>
                <Grid width="35%" textAlign="center">
                    <Typography fontWeight={600} variant="h4">
                        Un point de vente flexible et click and collect pour propulser votre magasin
                    </Typography>
                    <Typography variant="subtitle2" mt={4} mb={4}>
                        Un système point de vente click and collectpermettant aux clients d’effectuer leurs achats de
                        façon flexible, en ligne ou en magasin.
                    </Typography>
                    <ButtonRounded label="Découvrir" />
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
                mt={25}
                justifyContent="center"
                sx={{
                    background: `linear-gradient(white,${PRIMARY_COLOR}, ${PRIMARY_COLOR},white)`,
                }}
            >
                <Grid width="35%" textAlign="left">
                    <Grid container spacing={2} alignItems="center">
                        <TagIcon />
                        <Typography variant="h5">Touchez de nouveaux client</Typography>
                    </Grid>
                    <Typography variant="subtitle2">
                        Bla bla stat dash board ...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>

                    <Grid container spacing={2} mt={2} alignItems="center">
                        <AlternateEmailIcon />
                        <Typography variant="h5">Interagissez avec les clients</Typography>
                    </Grid>
                    <Typography variant="subtitle2" mb={2}>
                        Bla bla stat dash board ...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>

                    <Grid container spacing={2} mt={2} alignItems="center">
                        <EqualizerIcon />
                        <Typography variant="h5">Exploitez les données</Typography>
                    </Grid>
                    <Typography variant="subtitle2">
                        Bla bla stat dash board ...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                </Grid>

                <Grid>
                    <img
                        width={500}
                        src={`${process.env.PUBLIC_URL}/assets/illustrations/home-3.png`}
                        alt="Illustration"
                    />
                </Grid>
            </Grid>

            <Grid container mt={25} alignItems="center" justifyContent="center">
                <Grid maxWidth="35%" textAlign="center" justifyContent="center" alignItems="center" width="50%">
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        « Je voulais pouvoir être libre de faire des modifications sur le site, comme changer des images
                        ou modifier l’apparence du site. Collect & Verything m’apporte cette autonomie »
                    </Typography>
                    <Typography
                        mt={5}
                        sx={{
                            fontStyle: "italic",
                            backgroundColor: PRIMARY_COLOR,
                            display: "inline-block",
                            paddingRight: "12px",
                            paddingLeft: "15px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                        }}
                    >
                        Clara Morgan - Cliente
                    </Typography>
                </Grid>
                <Grid sx={{ textAlign: "center" }}>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/illustrations/home-4.png`}
                        alt="Client testimonial"
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                        }}
                    />
                </Grid>

                <Grid
                    alignItems="center"
                    textAlign="center"
                    mt={25}
                    pt={10}
                    pb={10}
                    width="100%"
                    sx={{
                        backgroundColor: PRIMARY_COLOR,
                    }}
                >
                    <Typography variant="h5" fontWeight={600}>
                        Développez votre activité ici
                    </Typography>

                    <Typography variant="subtitle2" pt={7}>
                        Que vous souhaitiez vendre des produits localement ou à l’international,
                    </Typography>
                    <Typography variant="subtitle2" pb={7}>
                        nous avons tous les outils qu’il vous faut.
                    </Typography>

                    <ButtonRounded label="Démarer maintenant" />
                </Grid>
            </Grid>
        </Grid>
    );
};
