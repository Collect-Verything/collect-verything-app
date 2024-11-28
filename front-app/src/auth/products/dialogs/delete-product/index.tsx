import { DialogProps } from "../../../../common/types/dialogs";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { ProductEntity } from "../../../../shop/boutique/type";
import { deleteProductById } from "../../request";
import { useNavigate } from "react-router-dom";

export const DeleteProduct = (props: DialogProps<ProductEntity>) => {
    const { buttonElement, rippleRef, row } = props;

    const nav = useNavigate();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    /*
     * TODO : window.location.reload()  mettre un context pour UX et eviter une page qui ce recharge, avec gestion d'etat de chargement comme pour l'etat user ...
     * */
    const handleDeleteProduct = () => {
        deleteProductById(row.id)
            .then(handleClose)
            .then(() => window.location.reload());
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
                <DialogTitle id="responsive-dialog-title">{"Suppression d'un produit"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Souhaitez vous réellement supprimer ce produit ?</DialogContentText>
                    <DialogContentText color="secondary" mt={2}>
                        {row.id}
                    </DialogContentText>
                    <DialogContentText> {row.name}</DialogContentText>
                    <DialogContentText> {row.title}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDeleteProduct} color="error">
                        Supprimer le produit
                    </Button>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
