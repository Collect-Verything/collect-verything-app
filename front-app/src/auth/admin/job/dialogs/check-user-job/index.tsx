import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DialogUserJobProps } from "../types";
import { Grid2, Typography } from "@mui/material";

export const CheckUserJob = (props: DialogUserJobProps) => {
    const { buttonElement, rippleRef, row } = props;

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Grid2>
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
                    <SearchIcon color="action" />
                </Button>
            </strong>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                sx={{ textAlign: "center" }}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Consultation et information de l'employé</DialogTitle>
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
                        {row.role.name}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Genre :
                        </Typography>
                        {row.gender}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Nom et Prenom :
                        </Typography>
                        {row.lastname} {row.firstname}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Date de naissance :
                        </Typography>
                        {String(row.birthDate).split("T")[0]}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Email :
                        </Typography>
                        {row.email}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Telephone :
                        </Typography>
                        {row.phone}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid2>
    );
};
