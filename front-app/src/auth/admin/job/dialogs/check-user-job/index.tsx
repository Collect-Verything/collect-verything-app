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
import { Grid, Typography } from "@mui/material";
import { User } from "../../../../../common/types/user";
import { DialogProps } from "../../../../../common/types/dialogs";

export const CheckUserJob = (props: DialogProps<User>) => {
    const { buttonElement, rippleRef, row } = props;

    const fields = [
        { label: "ID :", value: row.id },
        { label: "Stripe ID :", value: row.id_stripe },
        { label: "Role :", value: row.role.name },
        { label: "Genre :", value: row.gender },
        { label: "Nom et Prénom :", value: `${row.lastname} ${row.firstname}` },
        { label: "Date de naissance :", value: String(row.birthDate).split("T")[0] },
        { label: "Email :", value: row.email },
        { label: "Téléphone :", value: row.phone },
    ];

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
        <Grid>
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
                <DialogTitle id="responsive-dialog-title">Information de l&apos;utilisateur</DialogTitle>
                <DialogContent>
                    {fields.map(({ label, value }) => (
                        <DialogContentText key={label}>
                            <Typography color="secondary" mt={2}>
                                {label}
                            </Typography>
                            {value}
                        </DialogContentText>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};
