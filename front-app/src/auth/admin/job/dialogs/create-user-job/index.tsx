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
import { TextField, Typography } from "@mui/material";
import { User } from "../../../../../common/types/user";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ROLENAME } from "../../../../../common/const/user";
import { onChangeUser } from "../modify-user-job/tool";
import { fieldListUser } from "../modify-user-job/const";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { createAJobber } from "../../request";
import { defaultUser } from "../const";
import { createUser } from "../../../../../features/user-slice";
import { useAppDispatch } from "../../../../../features/authentication-slice";

// TODO : Alert sur les champs obliatoire et control des champ
interface CreateUserJobProps {
    handleGetAll: () => void;
    isUser?: boolean;
}

export const CreateUserAndJob = (props: CreateUserJobProps) => {
    const { handleGetAll, isUser } = props;

    const theme = useTheme();
    const dispatch = useAppDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState<User>(defaultUser);

    const buttonElement = React.useRef<HTMLButtonElement>(null);
    const rippleRef = React.useRef<TouchRippleActions>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        if (isUser === true) {
            dispatch(createUser(user)).then(handleClose);
        } else {
            createAJobber(user)
                .then(() => handleGetAll())
                .catch(() => console.log("error during sending form user job"));
        }
        handleClose();
    };

    const handleCancel = () => {
        setUser(user);
        handleClose();
    };

    useEffect(() => {
        if (isUser) {
            user.roleId = 1;
            user.role.name = "USER";
            user.role.id = 1;
        }
    }, []);

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
                    <PersonAddAltIcon color="secondary" />
                </Button>
            </strong>

            <Dialog
                fullScreen={fullScreen}
                sx={{ textAlign: "center" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {isUser ? "Céation d'un nouvel utilisateur" : "Céation d'un nouvel employé"}
                </DialogTitle>
                <DialogContent>
                    <DialogContent>
                        {!isUser && (
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
                        )}
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
                                value={dayjs(user?.birthDate)}
                                onChange={(newDate) => {
                                    if (newDate) {
                                        onChangeUser("birthDate", setUser, newDate.toISOString());
                                    }
                                }}
                            />
                        </DialogContentText>

                        {fieldListUser.map((item) => (
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
                    <Button autoFocus onClick={handleCreate} color="secondary">
                        Créer
                    </Button>
                    <Button autoFocus onClick={handleCancel} color="error">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
