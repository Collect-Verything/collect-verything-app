import Grid from "@mui/material/Grid2";
import { TextField, Typography } from "@mui/material";
import { ButtonRounded } from "../../common/component/buttons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BackgroundBlurPng } from "../../common/styles/bg-blur";
import Alert from "@mui/material/Alert";
import { login, useAppDispatch } from "../../features/authentication-slice";

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
            .catch((error: Error) => {
                setErrorLogin(true);
                console.error("Error during login:", error);
            })
            .then(() => navigate("/"));
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
                <Link style={{ textDecoration: "none", color: "black" }} to="/register">
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
                        variant="outlined"
                    />
                </Grid>
                <Grid>
                    <ButtonRounded label="Login" handleFx={handleLogin} />
                </Grid>
                <Grid textAlign="center" mt={3}>
                    <Link style={{ textDecoration: "none", color: "black" }} to="forgot-password">
                        Mot de passe oublié ?
                    </Link>
                    <Alert sx={{ width: "60vw", margin: "auto", marginTop: "1vh", textAlign: 'center' }} severity="info">
                        Log as :<br/>
                        - USER,  email // user@user.user // password: useruser .<br />
                        - SUPER_ADMIN //  email: admin@admin.admin // password: adminadmin .<br />
                        - JOB,  email // invoice@invoice.invoice // password: invoiceinvoice . <br />
                        - Double JOB //  email : invoicesupport@invoicesupport.invoicesupport // password: invoicesupport .
                    </Alert>
                </Grid>
            </Grid>
        </Grid>
    );
};
