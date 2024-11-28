import { DialogProps } from "../../../../common/types/dialogs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import ModeIcon from "@mui/icons-material/Mode";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import { ProductEntity } from "../../../../shop/boutique/type";
import { defaultProduct } from "../const";
import { fieldListProduct } from "./const";
import { onChangeProduct } from "./tool";
import { patchProductById } from "../../request";
import { PRODUCT_TYPE } from "../../../../common/const/product";

export const ModifyProduct = (props: DialogProps<ProductEntity>) => {
    const { buttonElement, rippleRef, row } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = React.useState<ProductEntity>(defaultProduct);

    useEffect(() => {
        if (Object.values(defaultProduct).map((value) => value === "")) {
            setProduct(row);
        }
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /*
     * TODO : window.location.reload()  mettre un context pour UX et eviter une page qui ce recharge, avec gestion d'etat de chargement comme pour l'etat user ...
     * TODO : Add rules on length of url path , must be superior than 22
     * */
    const handleModify = () => {
        // Patch user
        patchProductById(row.id, product)
            .then(handleClose)
            .then(() => window.location.reload())
            .catch(() => console.log("error during patch product"));
    };

    const handleCancel = () => {
        setProduct(row);
        handleClose();
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
                    <ModeIcon color="action" />
                </Button>
            </strong>

            <Dialog
                fullScreen={fullScreen}
                sx={{ textAlign: "center" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Modification des informations d'un employé"}</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        <DialogContentText>
                            <Typography color="secondary" mt={2}>
                                ID :
                            </Typography>
                            {row.id}
                        </DialogContentText>
                        <DialogContentText>
                            <Typography color="secondary" mt={2}>
                                Type :
                            </Typography>

                            <Box width={120} m="auto">
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={product?.type}
                                        label="Civilité"
                                        onChange={(e) => {
                                            onChangeProduct("type", setProduct, e.target.value as string);
                                        }}
                                    >
                                        <MenuItem value={PRODUCT_TYPE.SERVICE}>Service</MenuItem>
                                        <MenuItem value={PRODUCT_TYPE.PRODUCT}>Produit</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContentText>

                        {/*TODO : Fix modification bool*/}

                        <DialogContentText>
                            <Typography color="secondary" mt={2}>
                                Visible :
                            </Typography>

                            <Box width={120} m="auto">
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={product?.published ? "true" : "false"}
                                        label="Visibilité"
                                        onChange={(e) => {
                                            setProduct((old) => {
                                                return { ...old, published: e.target.value === "true" };
                                            });
                                        }}
                                    >
                                        <MenuItem value="true">Visible</MenuItem>
                                        <MenuItem value="false">Non visible</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContentText>

                        {fieldListProduct
                            .filter((field) => field.key !== "published")
                            .map((item) => (
                                <DialogContentText key={item.label}>
                                    <Typography color="secondary" mt={2}>
                                        {item.label}
                                    </Typography>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) => {
                                            onChangeProduct(item.key, setProduct, e.target.value as string);
                                        }}
                                        value={product?.[item.key]}
                                        multiline={["details", "description"].includes(item.key)}
                                        maxRows={["details", "description"].includes(item.key) ? 10 : undefined}
                                    />
                                </DialogContentText>
                            ))}
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleModify} color="secondary">
                        Modifier
                    </Button>
                    <Button autoFocus onClick={handleCancel} color="error">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
