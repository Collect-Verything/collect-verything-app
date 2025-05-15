import { DialogProps } from "../../../../common/types/dialogs";
import { ProductEntity } from "../../../../shop/boutique/type";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid2, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

// TODO : Afficher l'image

export const CheckProduct = (props: DialogProps<ProductEntity>) => {
    const { buttonElement, rippleRef, row } = props;

    const fields = [
        { label: "ID :", value: row.id },
        { label: "Image:", value: row.picture_path },
        { label: "Nom :", value: row.name },
        { label: "Titre :", value: row.title },
        { label: "Description :", value: row.description },
        { label: "Détails :", value: row.details },
        { label: "Type :", value: row.type },
        { label: "Stock :", value: row.stock },
        { label: "Prix :", value: row.price },
        { label: "Visible :", value: row.published ? <CheckIcon /> : <CloseIcon /> },
        { label: "Date de création :", value: String(row.createdAt).split("T")[0] },
        { label: "Derniere mise a jour :", value: String(row.updatedAt).split("T")[0] },
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
                <DialogTitle id="responsive-dialog-title">Information produit</DialogTitle>
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
        </Grid2>
    );
};
