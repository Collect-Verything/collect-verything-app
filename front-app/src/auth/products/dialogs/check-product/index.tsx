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

export const CheckProduct = (props: DialogProps<ProductEntity>) => {
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
                <DialogTitle id="responsive-dialog-title">Information produit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            ID :
                        </Typography>
                        {row.id}
                    </DialogContentText>
                    <DialogContentText>
                        {/*TODO : Afficher l'image*/}
                        <Typography color="secondary" mt={2}>
                            Image :
                        </Typography>
                        {row.picture_path}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Nom :
                        </Typography>
                        {row.name}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Titre :
                        </Typography>
                        {row.title}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Description :
                        </Typography>
                        {row.description}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Détails :
                        </Typography>
                        {row.details}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Type :
                        </Typography>
                        {row.type}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Stock :
                        </Typography>
                        {row.stock}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Prix :
                        </Typography>
                        {row.price}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Visible :
                        </Typography>
                        {row.published ? <CheckIcon /> : <CloseIcon />}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Date de création :
                        </Typography>
                        {String(row.createdAt).split("T")[0]}
                    </DialogContentText>

                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Derniere mise a jour :
                        </Typography>
                        {String(row.updatedAt).split("T")[0]}
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
