import { DialogProps } from "../../../common/types/dialogs";
import { Subscription } from "../type";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, Grid2, Typography } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { apiPost } from "../../../common/utils/web";
import { ConfigUrlWithPort } from "../../../app/micro-services";
import { SUBSCRIPTION_URL } from "../request";
import { useSelector } from "react-redux";
import { fetchUserSubscriptions } from "../../../features/subscription-slice";
import { useAppDispatch } from "../../../features/authentication-slice";

// Pour le moment la reactivation n'est pas encore mis en place

export const InfoSubscriptionDialog = (props: DialogProps<Subscription>) => {
    const { buttonElement, rippleRef, row } = props;

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const user = useSelector((store: any) => store.authenticate);
    const dispatch = useAppDispatch();

    const cancelSubRequest = (subIdStripe: string) => {
        apiPost(`${ConfigUrlWithPort}/${SUBSCRIPTION_URL}/${subIdStripe}`, {})
            .then(() => dispatch(fetchUserSubscriptions(user.id_stripe)))
            .catch(console.error);
    };

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
                    <ReceiptIcon color="secondary" />
                </Button>
            </strong>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                sx={{ textAlign: "center" }}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Votre abonement</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Contrat :
                        </Typography>
                        {row.active_stripe ? (
                            <Typography color="success"> Activé</Typography>
                        ) : (
                            <Typography color="warning"> Desactivé</Typography>
                        )}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Création de l'abonnement :
                        </Typography>
                        {new Date(row.current_period_start * 1000).toLocaleDateString("fr-FR")}
                    </DialogContentText>
                    <DialogContentText>
                        <Typography color="secondary" mt={2}>
                            Echéance de l'abonnement :
                        </Typography>
                        {new Date(row.current_period_end * 1000).toLocaleDateString("fr-FR")}
                    </DialogContentText>

                    {row.active_stripe ? (
                        <DialogContentText mt={4}>
                            <Button
                                onClick={() => cancelSubRequest(row.sub_stripe_id)}
                                variant="outlined"
                                color="warning"
                            >
                                Desactiver l'abonement
                            </Button>
                        </DialogContentText>
                    ) : (
                        <DialogContentText mt={4}>
                            <Button variant="outlined" color="success">
                                Réactiver l'abonement
                            </Button>
                        </DialogContentText>
                    )}
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
