import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DialogUserJobProps } from "../types";
import ModeIcon from "@mui/icons-material/Mode";
import { TextField, Typography } from "@mui/material";
import { User } from "../../../../../common/types/user";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ROLENAME } from "../../../../../common/const";
import { fieldList } from "./const";
import { onChangeUser } from "./tool";
import {defaultUser} from "../const";

// TODO : La personne qui consulte la modification des user job ne peut pas modifier son role

export const ModifyUserJob = (props: DialogUserJobProps) => {
    const { buttonElement, rippleRef, row } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState<User>(defaultUser);

    useEffect(() => {
        if(Object.values(defaultUser).map((value) => value === '')){
            setUser(row);
        }
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleModify = () => {
        console.log("modify", user);
        handleClose();
    };

    const handleCancel = () => {
        setUser(row);
        handleClose();
    };

    return (
        <React.Fragment>
            <strong>
                <Button
                    onClick={handleClickOpen}
                    ref={buttonElement}
                    touchRippleRef={rippleRef}
                    onKeyDown={(event: React.KeyboardEvent) => {
                        if (event.key === " ") {
                            event.stopPropagation();
                        }
                    }}
                >
                    <ModeIcon color="action" />
                </Button>
            </strong>

            <Dialog
                fullScreen={fullScreen}
                sx={{ textAlign: "center" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Modification des informations d'un employé"}</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        <DialogContentText>
                            <Typography color="secondary" mt={2}>
                                ID :
                            </Typography>
                            {row.id}
                        </DialogContentText>
                        <DialogContentText>
                            <Typography color="secondary" mt={2}>
                                Role :
                            </Typography>

                            <Box width={120} m="auto">
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={user?.role.name}
                                        label="Civilité"
                                        onChange={(e) => {
                                            onChangeUser("role", setUser, e.target.value as string);
                                        }}
                                    >
                                        {Object.values(ROLENAME).map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContentText>
                        <DialogContentText>
                            <Typography color="secondary" mt={2}>
                                Civilité :
                            </Typography>

                            <Box width={120} m="auto">
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={user?.gender}
                                        label="Civilité"
                                        onChange={(e) => {
                                            onChangeUser("gender", setUser, e.target.value as string);
                                        }}
                                    >
                                        <MenuItem value="Monsieur">Monsieur</MenuItem>
                                        <MenuItem value="Madame">Madame</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContentText>

                        <DialogContentText>
                            <Typography color="secondary" mt={2}>
                                Date de naissance :
                            </Typography>
                            <DatePicker
                                value={dayjs(row.birthDate)}
                                onChange={(newDate) => {
                                    if (newDate) {
                                        onChangeUser("birthDate", setUser, newDate.toISOString());
                                    }
                                }}
                            />
                        </DialogContentText>

                        {fieldList.map((item) => (
                            <DialogContentText key={item.label}>
                                <Typography color="secondary" mt={2}>
                                    {item.label}
                                </Typography>
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    onChange={(e) => {
                                        onChangeUser(item.key, setUser, e.target.value as string);
                                    }}
                                    value={user?.[item.key]}
                                />
                            </DialogContentText>
                        ))}
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleModify} color="secondary">
                        Modifier
                    </Button>
                    <Button autoFocus onClick={handleCancel} color="error">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
