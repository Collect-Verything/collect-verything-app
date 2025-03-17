import { DialogProps } from "../../../common/types/dialogs";
import { Configuration, Subscription } from "../type";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { apiPatch, apiPost } from "../../../common/utils/web";
import { ConfigUrlWithPort } from "../../../app/micro-services";
import Alert from "@mui/material/Alert";

// Pour le moment la reactivation n'est pas encore mis en place

export const ConfigDialog = (props: DialogProps<Subscription>) => {
    const { buttonElement, rippleRef, row } = props;

    const [config, setConfig] = useState<Partial<Configuration>>();
    const [error, setError] = useState<string|undefined>();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        if (row.configuration) {
            setConfig(row.configuration);
        } else {
            console.log("NOT Define");
        }
    }, []);

    // TODO : Catch error better

    const handleCreateConfig = () => {
        apiPost(`${ConfigUrlWithPort}/conf/${row.id}`, config)

        .then(() => apiPatch(`${ConfigUrlWithPort}/sub/${row.id}`)).then(handleClose)
            .catch(()=>setError("Un probleme est survenu avec votre requete, l'url choisit ou le nom de marque existe deja "));
    };

    // const user = useSelector((store: any) => store.authenticate);
    // const dispatch = useAppDispatch();

    // const cancelSubRequest = (subIdStripe: string) => {
    //     apiPost(`${ConfigUrlWithPort}/${SUBSCRIPTION_URL}/${subIdStripe}`, {})
    //         .then(() => dispatch(fetchUserSubscriptions(user.id_stripe)))
    //         .catch(console.error);
    // };

    const genericOnChange = (target: keyof Configuration, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [target]: e.target.value,
        }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError(undefined)
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
                    <SettingsApplicationsIcon color="secondary" />
                </Button>
            </strong>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                sx={{ textAlign: "center" }}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                {error &&
                <Alert severity="warning">{error}</Alert>
                }
                <DialogTitle id="responsive-dialog-title">Configuration</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {row.configured ? (
                            <DialogContentText mt={4}>
                                <Typography>{row.configuration.brand_name}</Typography>
                            </DialogContentText>
                        ) : (
                            <DialogContentText mt={4}>
                                <TextField
                                    id="outlined-basic"
                                    label="Nom de marque"
                                    variant="outlined"
                                    value={config?.brand_name}
                                    onChange={(e) => genericOnChange("brand_name", e)}
                                />
                            </DialogContentText>
                        )}
                    </DialogContentText>
                    <DialogContentText>
                        {row.configured ? (
                            <DialogContentText mt={4}>
                                <Typography>{row.configuration.admin_email}</Typography>
                            </DialogContentText>
                        ) : (
                            <DialogContentText mt={4}>
                                <TextField
                                    id="outlined-basic"
                                    label="Email administrateur"
                                    variant="outlined"
                                    value={config?.admin_email}
                                    onChange={(e) => genericOnChange("admin_email", e)}
                                />
                            </DialogContentText>
                        )}
                    </DialogContentText>

                    <DialogContentText>
                        {row.configured ? (
                            <DialogContentText mt={4}>
                                <Typography>{row.configuration.url}</Typography>
                            </DialogContentText>
                        ) : (
                            <DialogContentText mt={4}>
                                <TextField
                                    id="outlined-basic"
                                    label="Url de votre site web"
                                    variant="outlined"
                                    value={config?.url}
                                    onChange={(e) => genericOnChange("url", e)}
                                />
                            </DialogContentText>
                        )}
                    </DialogContentText>

                    <DialogContentText>
                        {row.configured ? (
                            <DialogContentText mt={4}>
                                <Typography>{row.configuration.website_type}</Typography>
                            </DialogContentText>
                        ) : (
                            <DialogContentText mt={4}>
                                <TextField
                                    id="outlined-basic"
                                    label="Type d'activité"
                                    variant="outlined"
                                    value={config?.website_type}
                                    onChange={(e) => genericOnChange("website_type", e)}
                                />
                            </DialogContentText>
                        )}
                    </DialogContentText>

                    {/*TODO : Regle sur la mise en ligne, attente retour erreur serveur*/}
                    {/*Si ok apsser la sub en configurer*/}
                    {/*Refresh la liste via la slice*/}
                    {row.configured ? (
                        <DialogContentText mt={4}>
                            <Button variant="outlined" color="info" disabled={true}>
                                Votre site est en ligne
                            </Button>
                        </DialogContentText>
                    ) : (
                        <DialogContentText mt={4}>
                            <Button variant="outlined" color="success" onClick={handleCreateConfig}>
                                Mettre en ligne votre site
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
