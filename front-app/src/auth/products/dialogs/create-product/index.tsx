import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import Button from "@mui/material/Button";
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
import { createProduct } from "../../request";
import AddIcon from "@mui/icons-material/Add";
import { onChangeProduct } from "../modify-product/tool";
import { PRODUCT_TYPE } from "../../../../common/const/product";
import { fieldListProduct } from "../modify-product/const";

interface CreateProductProps {
    handleGetAll: () => void;
}

// TODO : Catch error to display alert in dialog if a field is not correct ,by catching error server or by a rules apply to a field

export const CreateProduct = (props: CreateProductProps) => {
    const { handleGetAll } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = React.useState<ProductEntity>(defaultProduct);

    const buttonElement = React.useRef<HTMLButtonElement>(null);
    const rippleRef = React.useRef<TouchRippleActions>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        createProduct(product)
            .then(() => handleGetAll())
            .then(() => window.location.reload())
            .catch(() => console.log("error during sending form product"));

        handleClose();
    };

    const handleCancel = () => {
        setProduct(product);
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
                    <AddIcon color="secondary" />
                </Button>
            </strong>

            <Dialog
                fullScreen={fullScreen}
                sx={{ textAlign: "center" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Céer un produit</DialogTitle>
                <DialogContent>
                    <DialogContent>
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
                                        label="Type"
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
                        <DialogContentText>
                            <Typography color="secondary" mt={2}>
                                Visible :
                            </Typography>

                            <Box width={120} m="auto">
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={product?.published}
                                        label="Visibilité"
                                        onChange={(e) => {
                                            onChangeProduct("published", setProduct, e.target.value as string);
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
                                        InputProps={{
                                            ...((item.key === "stock" || item.key === "price") && {
                                                inputProps: { min: 0 },
                                            }),
                                        }}
                                        value={product?.[item.key]}
                                        multiline={["details", "description"].includes(item.key)}
                                        type={["stock", "price"].includes(item.key) ? "number" : "text"}
                                        maxRows={["details", "description"].includes(item.key) ? 10 : undefined}
                                    />
                                </DialogContentText>
                            ))}
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCreate} color="secondary">
                        Créer
                    </Button>
                    <Button autoFocus onClick={handleCancel} color="error">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
