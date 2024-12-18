import React from "react";
import Grid from "@mui/material/Grid2";
import { TextField, Typography } from "@mui/material";
import { ButtonRoundedSized } from "../component/buttons";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaqShop } from "../../common/assets/faq/faq-shop";
import { PRIMARY_DARKER_COLOR } from "../../common/styles/theme";

export const ResourcePage = () => {
    return (
        <Grid container flexDirection="column" textAlign="center" justifyContent="center" alignItems="center">
            <Grid mt={10}>
                <Typography variant="h3" fontWeight={600}>
                    Donnez vie à vos idées pour X €/mois
                </Typography>
            </Grid>

            <Grid mt={4}>
                <Typography>Tracez l’avenir de votre entreprise. Inscrivez-vous à un essai gratuit.</Typography>
            </Grid>

            <Grid mt={4}>
                <TextField
                    InputProps={{
                        style: { borderRadius: "25px", width: 300 },
                    }}
                    sx={{ marginTop: 3, marginBottom: 4 }}
                    id="outlined-basic"
                    label="Votre adresse e-mail"
                    variant="outlined"
                />
            </Grid>

            <Grid>
                <ButtonRoundedSized width="300px" height="50px" label="Démarer un essai" />
            </Grid>

            <Grid mt={10} width="50%" textAlign="center">
                <Typography>
                    Essayez Click&Verything gratuitement pendant 3 jours, aucune carte de crédit requise. En saisissant
                    votre e-mail, vous acceptez de recevoir des e-mails de marketing de la part de Click & Verything.
                </Typography>
            </Grid>

            <Grid mt={10}>
                <img
                    width={500}
                    src={`${process.env.PUBLIC_URL}/assets/illustrations/ressource-1.png`}
                    alt="Illustration"
                />
            </Grid>

            <Grid width="90%" borderTop="1px solid black" mt={10} mb={10}></Grid>

            <Grid mt={10} width="70%" textAlign="center">
                <Typography variant="h4" fontWeight={600}>
                    « Click&Verything est de loin la meilleure plateforme e-commerce du marché, et nous les avons toutes
                    testées ! »
                </Typography>
            </Grid>

            <Grid
                mt={10}
                pt={10}
                pb={10}
                sx={{ backgroundImage: `linear-gradient(white, ${PRIMARY_DARKER_COLOR})` }}
                width={"101vw"}
                ml={"-1vw"}
                container
                flexDirection="column"
                textAlign="center"
                justifyContent="center"
                alignItems="center"
            >
                <Grid>
                    <Typography variant="h3" fontWeight={600}>
                        Lancez l’entreprise de vos rêves
                    </Typography>
                </Grid>

                <Grid mt={5}>
                    <Typography>Démarrez votre essai gratuit des mainenant.</Typography>
                </Grid>

                <Grid>
                    <TextField
                        InputProps={{
                            style: { borderRadius: "25px", width: 300 },
                        }}
                        sx={{ marginTop: 3, marginBottom: 4 }}
                        id="outlined-basic"
                        label="Votre adresse e-mail"
                        variant="outlined"
                    />
                </Grid>

                <Grid>
                    <ButtonRoundedSized width="300px" height="50px" label="Démarer un essai" />
                </Grid>

                <Grid container spacing={2} mt={10}>
                    <Grid>
                        <img
                            width={150}
                            src={`${process.env.PUBLIC_URL}/assets/illustrations/ressource-label-1.png`}
                            alt="Illustration"
                        />
                    </Grid>
                    <Grid>
                        <img
                            width={200}
                            src={`${process.env.PUBLIC_URL}/assets/illustrations/ressource-label-1.png`}
                            alt="Illustration"
                        />
                    </Grid>
                    <Grid>
                        <img
                            width={150}
                            src={`${process.env.PUBLIC_URL}/assets/illustrations/ressource-label-1.png`}
                            alt="Illustration"
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid mt={10}>
                <Typography variant="h3" fontWeight={600}>
                    FAQ
                </Typography>
            </Grid>

            <Grid width="80%" justifyContent="center" mt={10} textAlign="center">
                {FaqShop.map((faq, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                            <Typography variant="h4" fontWeight={600}>
                                {faq.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>{faq.description}</AccordionDetails>
                    </Accordion>
                ))}
            </Grid>
        </Grid>
    );
};
