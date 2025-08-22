import { GridColDef } from "@mui/x-data-grid";
import { User } from "../../../common/types/user";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Dialog, Grid, Tooltip, Typography } from "@mui/material";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { getUserById } from "../../account/request";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CircleIcon from "@mui/icons-material/Circle";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/system";
import { apiPatch } from "../../../common/utils/web";
import { DeliveryUrlWithPort } from "../../../app/micro-services";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export const columnsDelivery: GridColDef<any>[] = [
    { field: "id", headerName: "Id", width: 30 },
    {
        field: "createdAt",
        headerName: "Date creation",
        width: 150,
        valueGetter: (params: string) => params.split("T")[0],
    },
    {
        field: "client",
        headerName: "Client",
        width: 150,
        renderCell: (params) => <CheckUser userFromRow={params.row} />,
    },
    {
        field: "delivery_status",
        headerName: "Status",
        width: 150,
        renderCell: (params) => <StatusDelivery delivery_status={params.row} />,
    },
    { field: "delivery_type", headerName: "Type", width: 150 },
    { field: "action", headerName: "Action", width: 150, renderCell: (params) => <ManageDelivery props={params} /> },

    // TROUVER MOYEN D'AFFICHER SOUS CHAMPS DE L'OBJECT USER
    // {
    //     field: "email",
    //     headerName: "Email",
    //     width: 100,
    // },
    // {
    //     field: "owner",
    //     headerName: "Stripe ID",
    //     width: 100,
    // },
];

interface ProductDeliveryType {
    id: number;
    name: string;
    quantity: number;
    delivered: number;
    createdAt: string;
    updatedAt: string;
}

interface UserDeliveryType {
    createdAt: string;

    email: string;
    id: number;
    name: string;
    owner: string;
    updatedAt: string;
}
type ProductStatus = "Pending" | "Partial" | "Done";

export interface DeliveryType {
    createdAt: string;
    delivery_status: string;
    // delivery_status: "Don" | "Pending" | "Partial";
    delivery_type: "Point_Relais" | "Shop";
    id: number;
    info: string;
    products: ProductDeliveryType[];
    productId: number;
    updatedAt: string;
    user: UserDeliveryType;
    userId: number;
    name: string;
}

interface CheckUserProps {
    userFromRow: DeliveryType;
}

export const CheckUser = ({ userFromRow }: CheckUserProps) => {
    const [row, setRow] = useState<User | undefined>();
    const [fields, setFields] = useState<{ label: string; value: string | number | undefined }[]>([]);
    const buttonElement = React.useRef<HTMLButtonElement>(null);
    const rippleRef = React.useRef<TouchRippleActions>(null);

    useEffect(() => {
        getUserById(userFromRow.id).then(setRow);
    }, [userFromRow.id]);

    useEffect(() => {
        if (row) {
            setFields([
                { label: "ID :", value: row.id },
                { label: "Stripe ID :", value: row.id_stripe },
                { label: "Role :", value: row.role?.name },
                { label: "Genre :", value: row.gender },
                { label: "Nom et Prénom :", value: `${row.lastname} ${row.firstname}` },
                {
                    label: "Date de naissance :",
                    value: row.birthDate ? String(row.birthDate).split("T")[0] : undefined,
                },
                { label: "Email :", value: row.email },
                { label: "Téléphone :", value: row.phone },
            ]);
        }
    }, [row]);

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid>
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
                {userFromRow.user.name}
            </Button>
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

interface ManageDeliveryProps {
    props: any;
}

export const ManageDelivery = ({ props }: ManageDeliveryProps) => {
    const { row } = props;
    const buttonElement = React.useRef<HTMLButtonElement>(null);
    const rippleRef = React.useRef<TouchRippleActions>(null);

    const [delivery, setDelivery] = useState<DeliveryType>();

    useEffect(() => {
        setDelivery(row);
        console.log(row);
    }, []);

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid>
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
                Gestion
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                sx={{ textAlign: "center" }}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Gestion de la livraison</DialogTitle>
                <DialogContent>
                    <Typography>Date : {delivery?.createdAt.split("T")[0]}</Typography>
                </DialogContent>

                <DialogContent>
                    <Typography>Client {delivery?.user.name}</Typography>
                    <Typography>Email: {delivery?.user.email}</Typography>
                </DialogContent>
                <DialogContent>
                    <Typography>Le client doit recuperer les elements suivant :</Typography>
                </DialogContent>

                <DialogActions>
                    <Grid>
                        {delivery?.products.map((product: ProductDeliveryType) => (
                            <Grid key={product.id}>
                                <Grid>
                                    <Typography>Produit : {product.name}</Typography>
                                </Grid>
                                <Grid>
                                    <Typography>Quantité attendu : {product.quantity}</Typography>
                                </Grid>
                                <Grid>
                                    <DeliveredProduct product={product} delivery={delivery} />
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </DialogActions>

                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

const getStatusColorMap = (status: any) => {
    // Point relais
    if (status.delivery_type === "Point_Relais") return "success";
    // Click And Collect
    if (status.delivery_status === "Pending") return "error";
    if (status.delivery_status === "Partial") return "warning";
    return "success";
};

const StatusDelivery = (delivery_type: any) => {
    const color = getStatusColorMap(delivery_type.delivery_status);
    return <CircleIcon color={color} />;
};

interface DeliveredProductProps {
    delivery: DeliveryType;
    product: ProductDeliveryType;
    step?: number;
}

export const DeliveredProduct = (props: DeliveredProductProps) => {
    const { product, delivery, step = 1 } = props;

    const [targetDelivered, setTargetDelivered] = useState<number>(product?.delivered ?? 0);
    const [btnStatus, setBtnStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

    useEffect(() => {
        setTargetDelivered(product?.delivered ?? 0);
    }, [product?.id, product?.delivered, product?.quantity]);

    const clamp = (val: number) => Math.max(product.delivered, Math.min(product.quantity, val));

    const canEdit = useMemo(() => {
        if (!product?.id) return false;
        if (delivery.delivery_type === "Point_Relais") return false;
        if (product.delivered >= product.quantity) return false; // tout livré
        return true;
    }, [product?.id, product?.delivered, product?.quantity, delivery.delivery_type]);

    const remaining = Math.max(0, product.quantity - product.delivered);
    const addedNow = Math.max(0, targetDelivered - product.delivered);
    const isComplete = targetDelivered === product.quantity;
    const hasChange = targetDelivered !== product.delivered;

    const inc = () => setTargetDelivered((prev) => clamp(prev + step));
    const dec = () => setTargetDelivered((prev) => clamp(prev - step));
    const setAll = () => setTargetDelivered(product.quantity);
    const reset = () => setTargetDelivered(product.delivered);

    const handleSave = async () => {
        setBtnStatus("saving");
        try {
            const response = await apiPatch(`${DeliveryUrlWithPort}/${delivery.id}`, {
                productId: product.id,
                stockDelivered: targetDelivered,
            });

            if (response.success) {
                setBtnStatus("success");
            } else {
                setBtnStatus("error");
            }
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
            setBtnStatus("error");
        }
    };

    if (!product?.id) return <CircularProgress color="secondary" />;
    if (delivery.delivery_type === "Point_Relais") return <Typography>Livraison effectuée en point relais.</Typography>;
    if (product.delivered >= product.quantity) return <Typography>Livré.</Typography>;

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid>
                <Typography variant="h6">
                    {product.name ?? "Produit"} — à livrer : {product.quantity}
                </Typography>
            </Grid>

            <Grid>
                {isComplete ? (
                    <Tooltip title="Tout a été livré pour ce produit">
                        <RadioButtonCheckedIcon color="success" />
                    </Tooltip>
                ) : (
                    <Tooltip title="Il reste des quantités à livrer">
                        <RadioButtonUncheckedIcon color="error" />
                    </Tooltip>
                )}
            </Grid>

            <Grid>
                <Typography>
                    Déjà livré (persisté) : <b>{product.delivered}</b>
                </Typography>
                <Typography>
                    Restant à livrer : <b>{remaining}</b>
                </Typography>
                <Typography>
                    Vous allez ajouter : <b>{addedNow}</b>
                </Typography>
                <Typography>
                    Cible (après enregistrement) : <b>{targetDelivered}</b> / {product.quantity}
                </Typography>
            </Grid>

            <Grid>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        onClick={dec}
                        disabled={!canEdit || targetDelivered <= product.delivered}
                    >
                        -{step}
                    </Button>
                    <Button variant="outlined" onClick={inc} disabled={!canEdit || targetDelivered >= product.quantity}>
                        +{step}
                    </Button>
                    <Button variant="text" onClick={setAll} disabled={!canEdit || targetDelivered === product.quantity}>
                        Rendu total
                    </Button>
                    <Button variant="text" onClick={reset} disabled={!canEdit || !hasChange}>
                        Réinitialiser
                    </Button>
                    <Button
                        variant="contained"
                        disabled={btnStatus === "saving" || btnStatus === "success" || !canEdit || addedNow <= 0}
                        onClick={handleSave}
                    >
                        {btnStatus === "success" ? <TaskAltIcon /> : `Enregistrer (+${addedNow})`}
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};
