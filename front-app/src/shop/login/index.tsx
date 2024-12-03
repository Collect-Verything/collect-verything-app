import Grid from "@mui/material/Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { ButtonRounded } from "../../common/component/buttons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BackgroundBlurPng } from "../../common/styles/bg-blur";
import Alert from "@mui/material/Alert";
import { login, useAppDispatch } from "../../features/authentication-slice";
import { URL_FRONT } from "../../app/router/const";

export interface LoginProps {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const [authLogin, setAuthLogin] = useState<LoginProps>({ email: "", password: "" });
    const [errorLogin, setErrorLogin] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        setErrorLogin(false);
        dispatch(login(authLogin))
            .then(() => navigate("/"))
            .catch((error: Error) => {
                setErrorLogin(true);
                console.error("Error during login:", error);
            });
    };

    return (
        <Grid>
            {errorLogin && (
                <Alert sx={{ width: "99vw", margin: "auto", marginTop: "1vh" }} severity="error">
                    An error occurred with your request.
                </Alert>
            )}
            <Grid container justifyContent="space-between" padding={1}>
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                    <ArrowBackIcon />
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }} to={`/${URL_FRONT.REGISTER}`}>
                    <ButtonRounded label="Register" />
                </Link>
            </Grid>
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
                        handleLogin();
                    }
                }}
            >
                <Grid>
                    <Typography pb={3} variant="h3" color="black">
                        Hello !
                    </Typography>
                </Grid>
                <Grid>
                    <TextField
                        onChange={(event) => setAuthLogin({ ...authLogin, email: event.target.value })}
                        InputProps={{
                            style: { borderRadius: "25px", width: 300 },
                        }}
                        id="outlined-basic"
                        label="Votre adresse email"
                        variant="outlined"
                        value={authLogin.email}
                    />
                </Grid>
                <Grid>
                    <TextField
                        onChange={(event) => setAuthLogin({ ...authLogin, password: event.target.value })}
                        InputProps={{
                            style: { borderRadius: "25px", width: 300 },
                        }}
                        sx={{ marginTop: 3, marginBottom: 4 }}
                        id="outlined-basic"
                        label="Votre mot de passe"
                        type="password"
                        variant="outlined"
                        value={authLogin.password}
                    />
                </Grid>
                <Grid>
                    <ButtonRounded label="Login" handleFx={handleLogin} />
                </Grid>
                <Grid textAlign="center" mt={3}>
                    <Link style={{ textDecoration: "none", color: "black" }} to="forgot-password">
                        Mot de passe oublié ?
                    </Link>
                    <Grid margin="auto" mt="1vh" bgcolor="#9834" borderRadius="15px" padding={3}>
                        {[
                            ["admin@admin.fr", "adminadmin", "SUPER_ADMIN"],
                            ["user@user.fr", "useruser", "USER"],
                            ["invoice@invoice.fr", "invoiceinvoice", "INVOICE"],
                        ].map((i) => (
                            <Grid container key={i[0]} mt={2} alignItems="center">
                                <Button
                                    variant="contained"
                                    onClick={() => setAuthLogin({ email: i[0], password: i[1] })}
                                >
                                    {i[2]}
                                </Button>
                                <Typography ml={2}>
                                    {i[0]} - {i[1]}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
