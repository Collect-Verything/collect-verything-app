import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DialogUserJobProps } from "../types";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteAJobbers } from "../../request";

export const DeleteUserJob = (props: DialogUserJobProps) => {
    const { buttonElement, rippleRef, row } = props;

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleDeleteUserJob = () => {
        deleteAJobbers(row.id!).then(handleClose);
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
                    <DialogContentText>{row.roles}</DialogContentText>
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
