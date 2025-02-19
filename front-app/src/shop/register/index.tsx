import Grid from "@mui/material/Grid2";
import { TextField, Typography } from "@mui/material";
import { ButtonRounded } from "../component/buttons";
import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "./style.css";
import { BackgroundBlurPng } from "../../common/styles/bg-blur";
import { URL_FRONT } from "../../app/router/const";
import {
    ALERT_MESSAGE_FIELD,
    AlertRegisterType,
    checkRegisterForm,
    initRegisterForm,
    onChangeRegisterField,
    userRegisterList,
    UserRegisterType,
} from "./const";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import { registerRequest } from "./request";

// TODO : Les champs doivent etre vide a la validation du formulaire
// TODO : Effectuer une redirection sur login apres avoir informé l'utilisateur que le register est confirmé

export const RegisterPage = () => {
    const [registerForm, setRegisterForm] = React.useState<UserRegisterType>(initRegisterForm);
    const [alerts, setAlerts] = React.useState<AlertRegisterType | undefined>();

    const handleRegister = async () => {
        const isValid = await checkRegisterForm(registerForm, setAlerts);

        if (!isValid) {
            return;
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...cleanedRegisterForm } = registerForm;
            await registerRequest(cleanedRegisterForm);
            setAlerts(ALERT_MESSAGE_FIELD.REGISTER_SUCCESS);
            setRegisterForm(initRegisterForm);
        } catch {
            setAlerts(ALERT_MESSAGE_FIELD.REGISTER_FAILED);
        }
    };

    return (
        <Grid>
            <BackgroundBlurPng url="assets/blur/bg-blur-2.png" rotate="180" blur="0" />

            <Grid container justifyContent="space-between" padding={1}>
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                    <ArrowBackIcon />
                </Link>
                <Link style={{ textDecoration: "none", color: "black" }} to={`/${URL_FRONT.LOGIN}`}>
                    <ButtonRounded label="Login" />
                </Link>
            </Grid>

            <Grid pb={5} container flexDirection="column" justifyContent="center" alignItems="center">
                {alerts && <Alert severity={alerts.alertStatus}>{alerts.alertMessage}</Alert>}
                <Grid>
                    <Typography pb={3} variant="h3" color="black">
                        Welcome !
                    </Typography>
                </Grid>

                {userRegisterList.map((field) => (
                    <Grid key={field.key}>
                        {field.key === "gender" && (
                            <FormControl fullWidth sx={{ marginBottom: 2, borderRadius: "14px" }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={registerForm?.gender}
                                    label="Civilité"
                                    onChange={(e) => {
                                        onChangeRegisterField("gender", setRegisterForm, e.target.value as string);
                                    }}
                                >
                                    <MenuItem value="Monsieur">Monsieur</MenuItem>
                                    <MenuItem value="Madame">Madame</MenuItem>
                                </Select>
                            </FormControl>
                        )}

                        {field.key === "birthDate" && (
                            <DatePicker
                                sx={{ marginBottom: 2, borderRadius: "14px" }}
                                label={field.label}
                                value={dayjs(registerForm.birthDate)}
                                onChange={(e) => {
                                    if (e) onChangeRegisterField(field.key, setRegisterForm, e.toISOString());
                                }}
                            />
                        )}

                        {field.key !== "birthDate" && field.key !== "gender" && (
                            <TextField
                                InputProps={{
                                    style: { borderRadius: "25px", width: 300 },
                                }}
                                sx={{ paddingBottom: 2 }}
                                label={field.label}
                                onChange={(e) => onChangeRegisterField(field.key, setRegisterForm, e.target.value)}
                                type={field.key === "password" || field.key === "confirmPassword" ? "password" : "text"}
                                error={
                                    field.key === "confirmPassword" &&
                                    registerForm.password !== registerForm.confirmPassword
                                }
                            />
                        )}
                    </Grid>
                ))}
                <Grid mt={2}>
                    <ButtonRounded label="Register" handleFx={handleRegister} />
                </Grid>
            </Grid>
        </Grid>
    );
};
