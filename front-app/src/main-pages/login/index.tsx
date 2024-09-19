import Grid from "@mui/material/Grid2";
import { TextField, Typography } from "@mui/material";
import { ButtonRounded } from "../../common/component/buttons";
import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BackgroundBlurPng } from "../../common/styles/bg-blur";

export const LoginPage = () => {
    return (
        <Grid>
            <Grid container justifyContent="space-between" padding={1}>
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                    <ArrowBackIcon />
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }} to="/register">
                    <ButtonRounded label="Register" />
                </Link>
            </Grid>
            <BackgroundBlurPng url="assets/blur/bg-blur-0.png" blur="1.5rem" />
            <Grid
                pt={5}
                pb={5}
                container
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop={15}
            >
                <Grid>
                    <Typography pb={3} variant="h3" color="black">
                        Hello !
                    </Typography>
                </Grid>
                <Grid>
                    <TextField
                        InputProps={{
                            style: { borderRadius: "25px", width: 300 },
                        }}
                        id="outlined-basic"
                        label="Votre adresse email"
                        variant="outlined"
                    />
                </Grid>
                <Grid>
                    <TextField
                        InputProps={{
                            style: { borderRadius: "25px", width: 300 },
                        }}
                        sx={{ marginTop: 3, marginBottom: 4 }}
                        id="outlined-basic"
                        label="Votre mot de passe"
                        variant="outlined"
                    />
                </Grid>
                <Grid>
                    <ButtonRounded label="Login" />
                </Grid>
                <Grid textAlign="center" mt={3}>
                    <Link style={{ textDecoration: "none", color: "black" }} to="forgot-password">
                        Mot de passe oublié ?
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
};
