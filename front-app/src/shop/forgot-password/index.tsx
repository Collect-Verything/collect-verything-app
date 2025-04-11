import Grid from "@mui/material/Grid2";
//import { Button, TextField, Typography } from "@mui/material";
import { ButtonRounded } from "../component/buttons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BackgroundBlurPng } from "../../common/styles/bg-blur";
import { URL_FRONT } from "../../app/router/const";
import { TextField, Typography } from "@mui/material";
import { forgotPasswordRequest } from "./request";
import Alert from "@mui/material/Alert";

export interface ForgotPassword {
    email: string;
}

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<ForgotPassword>({ email: "" });
    const [alerts, setAlerts] = React.useState<boolean>(false);
    const [displayValidation, setDisplayValidation] = React.useState<boolean>(false);

    const handleForgotPassword = () => {
        setAlerts(false);
        forgotPasswordRequest(email)
            .then(() => {
                setEmail({ email: "" });
                setDisplayValidation(true);
            })
            .catch(() => setAlerts(true));
    };

    return (
        <Grid>
            <Grid container justifyContent="space-between" padding={1}>
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                    <ArrowBackIcon />
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }} to={`/${URL_FRONT.LOGIN}`}>
                    <ButtonRounded label="Login" />
                </Link>
            </Grid>
            {alerts && <Alert severity={"warning"}>Une erreur est survenue, veuillez nous contacter</Alert>}
            <BackgroundBlurPng url="assets/blur/bg-blur-2.png" blur="0" />
            {displayValidation ? (
                <Grid
                    container
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pt={5}
                    pb={5}
                    mt={15}
                >
                    <Typography variant="h4" color="black" pb={3} align="center">
                        ✅ Votre mot de passe a bien été réinitialisé.
                    </Typography>
                    <Typography variant="h6" color="black" pb={3} align="center">
                        <br />Consultez votre boîte mail pour le lien de réinitialisation.
                    </Typography>
                </Grid>
            ) : (
                <Grid
                    container
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pt={5}
                    pb={5}
                    mt={15}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleForgotPassword();
                        }
                    }}
                >
                    <Typography variant="h4" color="black" pb={3}>
                        🔐 Réinitialiser votre mot de passe
                    </Typography>

                    <TextField
                        id="email"
                        label="Adresse email"
                        variant="outlined"
                        value={email.email}
                        onChange={(event) => setEmail({ ...email, email: event.target.value })}
                        InputProps={{
                            style: { borderRadius: 25, width: 300 },
                        }}
                    />

                    <Grid mt={3}>
                        <ButtonRounded label="Envoyer" handleFx={handleForgotPassword} />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};
