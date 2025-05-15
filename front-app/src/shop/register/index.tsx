import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import { ButtonRounded } from "../component/buttons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "./style.css";
import { BackgroundBlurPng } from "../../common/styles/bg-blur";
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
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { PATH_NAME } from "../../common/const/path";

// TODO : Les champs doivent etre vide a la validation du formulaire
// TODO : Effectuer une redirection sur login apres avoir informé l'utilisateur que le register est confirmé

/**
 * Composant/formulaire d'inscription utilisateur.
 *
 * Ce composant utilise un objet `UserRegisterType` qui étend le type `User`
 * pour inclure un champ supplémentaire `confirmPassword`, utilisé uniquement côté client
 * pour vérifier que le mot de passe et la confirmation correspondent.
 *
 * Avant d'envoyer les données au backend, on extrait le champ `confirmPassword`
 * à l’aide de la destructuration d’objet :
 *
 * ```ts
 * const { confirmPassword, ...user } = registerUser;
 * await axios.post<User>('/api/register', user);
 * ```
 *
 * Cela permet de ne transmettre au backend que les champs attendus par le type `User`,
 * évitant ainsi une erreur côté serveur liée à un champ non reconnu.
 *
 * Avantages :
 * - Garde le type `RegisterUser` complet côté formulaire (validation UX)
 * - N’envoie au backend que les données strictement nécessaires
 * - Sépare clairement logique client / logique API
 */

export const RegisterPage = () => {
    const [registerForm, setRegisterForm] = useState<UserRegisterType>(initRegisterForm);
    const [alerts, setAlerts] = useState<AlertRegisterType | undefined>();
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const nav = useNavigate();

    const handleRegister = async () => {
        const isValid = await checkRegisterForm(registerForm, setAlerts);

        if (!isValid) return;

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...cleanedRegisterForm } = registerForm;
            await registerRequest(cleanedRegisterForm).then(() => setDisplaySuccess(true));
            setRegisterForm(initRegisterForm);
            setTimeout(() => {
                nav(`/${PATH_NAME.LOGIN}`);
            }, 2000);
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
                <Link style={{ textDecoration: "none", color: "black" }} to={`/${PATH_NAME.LOGIN}`}>
                    <ButtonRounded label="Login" />
                </Link>
            </Grid>

            <Grid
                pb={5}
                container
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
            >
                {displaySuccess ? (
                    <Grid
                        bgcolor="white"
                        spacing={5}
                        borderRadius={5}
                        margin={10}
                        padding={10}
                        boxShadow={5}
                        border={1}
                    >
                        <Typography mb={2} variant="h3">
                            Inscription confirmée
                        </Typography>
                        <DoneOutlineIcon color="success" />
                    </Grid>
                ) : (
                    <>
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
                                                onChangeRegisterField(
                                                    "gender",
                                                    setRegisterForm,
                                                    e.target.value as string,
                                                );
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
                                        onChange={(e) =>
                                            onChangeRegisterField(field.key, setRegisterForm, e.target.value)
                                        }
                                        type={
                                            field.key === "password" || field.key === "confirmPassword"
                                                ? "password"
                                                : "text"
                                        }
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
                    </>
                )}
            </Grid>
        </Grid>
    );
};
