import Grid from "@mui/material/Grid2";
//import { Button, TextField, Typography } from "@mui/material";
import { ButtonRounded } from "../component/buttons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BackgroundBlurPng } from "../../common/styles/bg-blur";
import { URL_FRONT } from "../../app/router/const";
import {TextField, Typography} from "@mui/material";
import {forgotPasswordRequest} from "./request";
import Alert from "@mui/material/Alert";

export interface ForgotPassword {
    email: string;
}

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<ForgotPassword>({ email: "" });
    const [alerts, setAlerts] = React.useState<boolean>(false);

    const handleForgotPassword = () => {
        setAlerts(false);
        forgotPasswordRequest(email).then(()=>setEmail({email:""})).catch(()=>setAlerts(true));
    };

    return (
        <Grid>
            <Grid container justifyContent="space-between" padding={1}>
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                    <ArrowBackIcon />
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }} to={`/${URL_FRONT.REGISTER}`}>
                    <ButtonRounded label="Register" />
                </Link>
            </Grid>
            {alerts && <Alert severity={"warning"}>Une erreur est survenue, veuillez nous contacter</Alert>}
            <BackgroundBlurPng url="assets/blur/bg-blur-2.png" blur="0" />
            <Grid
                pt={5}
                pb={5}
                container
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop={15}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleForgotPassword();
                    }
                }}
            >
                <Grid>
                    <Typography pb={3} variant="h3" color="black">
                        Rénitialiser le mot de passe
                    </Typography>
                </Grid>
                <Grid>
                    <TextField
                        onChange={(event) => setEmail({ ...email, email: event.target.value })}
                        InputProps={{
                            style: { borderRadius: "25px", width: 300 },
                        }}
                        id="outlined-basic"
                        label="Votre adresse email"
                        variant="outlined"
                        value={email.email}
                    />
                </Grid>
                <Grid>
                    <ButtonRounded label="Envoyer" handleFx={handleForgotPassword} />
                </Grid>
            </Grid>
        </Grid>
    );
};
