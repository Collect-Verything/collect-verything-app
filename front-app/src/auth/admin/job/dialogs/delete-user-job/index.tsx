import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DialogProps } from "../../../../../common/types/dialogs";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch } from "../../../../../features/authentication-slice";
import { deleteById } from "../../../../../features/user-job-slice";
import { useLocation } from "react-router-dom";
import { deleteUserById } from "../../../../../features/user-slice";
import { User } from "../../../../../common/types/user";
import { URL_FRONT } from "../../../../../app/router/const";

export const DeleteUserJob = (props: DialogProps<User>) => {
    const { buttonElement, rippleRef, row } = props;

    const dispatch = useAppDispatch();
    const location = useLocation();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleDeleteUserJob = () => {
        if (location.pathname.includes(`${URL_FRONT.GESTION_CUSTOMER}`)) {
            dispatch(deleteUserById(String(row.id))).then(handleClose);
        }
        dispatch(deleteById(String(row.id))).then(handleClose);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    <ClearIcon color="secondary" />
                </Button>
            </strong>

            <Dialog
                sx={{ textAlign: "center" }}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Suppression d'un salarié"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Souhaitez vous réellement supprimer le salarié ci dessous ?</DialogContentText>
                    <DialogContentText color="secondary" mt={2}>
                        {row.id} - {row.firstname} {row.lastname}
                    </DialogContentText>
                    <DialogContentText> {row.role.name}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDeleteUserJob} color="error">
                        Supprimer le salarié
                    </Button>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
