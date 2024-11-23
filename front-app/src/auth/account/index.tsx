import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { User } from "../../common/types/user";
import { useSelector } from "react-redux";
import { getUserById, postModifyUser } from "./request";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { initUser, listUserField } from "./const";

export const Account = () => {
    const [user, setUser] = useState<User>(initUser);
    const { userId } = useSelector((store: any) => store.authenticate);

    const handleCancelModifyUser = () => {
        getUserById(userId).then(setUser);
    };

    const onChangeUser = (param: keyof User, setUser: Dispatch<SetStateAction<User>>, value: string) => {
        setUser((old) => {
            return { ...old, [param]: value };
        });
    };

    const handleValidateModifiUser = () => {
        postModifyUser(user);
        getUserById(userId).then(setUser);
    };

    useEffect(() => {
        getUserById(userId).then(setUser);
    }, []);

    return (
        <Grid spacing={2} margin="auto">
            <Grid display="flex" flexDirection="column" sx={{ gap: 2 }}>
                <Typography variant="h4" component="div">
                    Information personnel
                </Typography>

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
                    />
                ))}
                <DatePicker
                    value={dayjs(user?.birthDate)}
                    onChange={(e) => {
                        if (e) {
                            onChangeUser("birthDate", setUser, e.toISOString());
                        }
                    }}
                />
                <Grid container justifyContent="space-between">
                    <Button variant="contained" color="secondary" onClick={handleValidateModifiUser}>
                        Modifier mon profile
                    </Button>
                    <Button variant="contained" color="error" onClick={handleCancelModifyUser}>
                        Annuler
                    </Button>
                </Grid>
            </Grid>
            <Grid display="flex" flexDirection="column" spacing={2} mt={4} sx={{ gap: 2 }}>
                <Typography variant="h4" component="div">
                    Modifier mot de passe
                </Typography>
                <TextField id="outlined-basic" label="Mot de passe actuel" variant="outlined" color="secondary" />
                <TextField id="outlined-basic" label="Nouveau mot de passe" variant="outlined" color="secondary" />
                <TextField id="outlined-basic" label="Confirmation mot de passe" variant="outlined" color="secondary" />
                <Button variant="contained" color="secondary">
                    Modifier mon mot de passe
                </Button>
            </Grid>
        </Grid>
    );
};
