import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { User } from "../../common/types/user";
import { useSelector } from "react-redux";
import { getUserById, patchModifyPasswordUser, postModifyUser } from "./request";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AlertType, initUser, listPasswordField, listUserField } from "./const";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { ChangePasswordType } from "./type";
import Alert from "@mui/material/Alert";
import { RootState } from "../../features/store";

export const Account = () => {
    const [user, setUser] = useState<User>(initUser);
    const [alertUserForm, setAlertUserForm] = useState<AlertType>({ type: undefined, text: "" });
    const [isModifyUser, setIsModifyUser] = useState(true);

    const [modifyPasswordSet, setModifyPasswordSet] = useState<ChangePasswordType>();
    const [alertPassword, setAlertPassword] = useState<AlertType>({ type: undefined, text: "" });
    const [isModifyPassword, setIsModifyPassword] = useState(true);

    const { id } = useSelector((store: RootState) => store.authenticate);

    const handleCancelModifyUser = () => {
        setAlertUserForm({ type: undefined, text: "" });
        getUserById(id!).then(setUser);
        setIsModifyUser(true);
    };

    const onChangeUser = (param: keyof User, setUser: Dispatch<SetStateAction<User>>, value: string) => {
        setUser((old) => {
            return { ...old, [param]: value };
        });
    };

    const handleValidateModifyUser = async () => {
        await postModifyUser(user)
            .then(() => setAlertUserForm({ type: "success", text: "Profil modifié avec succé" }))
            .catch(() =>
                setAlertPassword({
                    type: "error",
                    text: "Erreur lors de la modification de votre profil",
                }),
            );
        await getUserById(id!).then(setUser);
        setIsModifyUser(true);
    };

    const handleModifyPassword = () => {
        setAlertPassword({ type: undefined, text: "" });
        if (modifyPasswordSet?.newPassword !== modifyPasswordSet?.confirmPassword) {
            setAlertPassword({ type: "warning", text: "Le mot de passe ne correspondent pas" });
        }

        if (modifyPasswordSet?.newPassword === modifyPasswordSet?.confirmPassword) {
            patchModifyPasswordUser(id!, modifyPasswordSet!)
                .then(() => {
                    setAlertPassword({ type: "success", text: "Mot de passe modifié avec succée" });
                    setIsModifyPassword(true);
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.message || "Un problème est apparu";
                    setAlertPassword({
                        type: "error",
                        text: errorMessage,
                    });
                });
        }
    };

    useEffect(() => {
        getUserById(id!).then(setUser);
    }, []);

    return (
        <Grid spacing={2} margin="auto">
            <Grid display="flex" flexDirection="column" sx={{ gap: 2 }}>
                <Typography variant="h4" component="div">
                    Information personnel
                </Typography>
                {alertUserForm.type && <Alert severity={alertUserForm.type}>{alertUserForm.text}</Alert>}

                <FormControl fullWidth>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={user?.gender}
                            // label="Civilité"
                            disabled={isModifyUser}
                            onChange={(e) => {
                                onChangeUser("gender", setUser, e.target.value as string);
                            }}
                        >
                            <MenuItem value="Monsieur">Monsieur</MenuItem>
                            <MenuItem value="Madame">Madame</MenuItem>
                        </Select>
                    </FormControl>
                </FormControl>

                {listUserField.map((item) => (
                    <TextField
                        key={item.label}
                        id="outlined-basic"
                        label={item.label}
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => {
                            onChangeUser(item.field, setUser, e.target.value as string);
                        }}
                        value={user[item.field]}
                        disabled={isModifyUser}
                    />
                ))}
                <DatePicker
                    value={dayjs(user?.birthDate)}
                    disabled={isModifyUser}
                    label="Date de naissance"
                    onChange={(e) => {
                        if (e) {
                            onChangeUser("birthDate", setUser, e.toISOString());
                        }
                    }}
                />
                <Grid container justifyContent="space-around">
                    {isModifyUser && (
                        <Button variant="contained" onClick={() => setIsModifyUser(!isModifyUser)}>
                            <EditIcon />
                        </Button>
                    )}
                    {!isModifyUser && (
                        <>
                            <Button variant="contained" disabled={isModifyUser} onClick={handleValidateModifyUser}>
                                <DoneIcon />
                            </Button>
                            <Button variant="contained" onClick={handleCancelModifyUser}>
                                <CloseIcon color="error" />
                            </Button>
                        </>
                    )}
                </Grid>
            </Grid>
            <Grid display="flex" flexDirection="column" spacing={2} mt={4} sx={{ gap: 2 }}>
                <Typography variant="h4" component="div">
                    Modifier mot de passe
                </Typography>

                {alertPassword.type && <Alert severity={alertPassword.type}>{alertPassword.text}</Alert>}

                {listPasswordField.map((item) => (
                    <TextField
                        key={item.label}
                        id="outlined-basic"
                        label={item.label}
                        variant="outlined"
                        color="secondary"
                        disabled={isModifyPassword}
                        type="password"
                        onChange={(e) => setModifyPasswordSet((old) => ({ ...old, [item.field]: e.target.value }))}
                    />
                ))}

                <Grid container justifyContent="space-around">
                    {isModifyPassword && (
                        <Button variant="contained" onClick={() => setIsModifyPassword(!isModifyPassword)}>
                            <EditIcon />
                        </Button>
                    )}
                    {!isModifyPassword && (
                        <>
                            <Button variant="contained" disabled={isModifyPassword} onClick={handleModifyPassword}>
                                <DoneIcon />
                            </Button>
                            <Button variant="contained" onClick={() => setIsModifyPassword(true)}>
                                <CloseIcon color="error" />
                            </Button>
                        </>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};
