import { GridColDef } from "@mui/x-data-grid";
import { User } from "../../../common/types/user";
import React, { useEffect, useState } from "react";
import { Button, Dialog, Grid, Typography } from "@mui/material";
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

// const statusColorMap: Record<ProductStatus, "error" | "warning" | "success"> = {
//     Pending: "error",
//     Partial: "warning",
//     Done: "success",
// };

const getStatusColorMap = (status: any) => {
    if (status.delivery_status === "Pending") return "error";
    if (status.delivery_status === "Partial") return "warning";
    return "success";
};

const StatusDelivery = (delivery_type: any) => {
    const color = getStatusColorMap(delivery_type.delivery_status);
    return <CircleIcon color={color} />;
};

// interface DeliveredProductProps {
//     id: number;
//     name: string;
//     quantity: number;
//     delivered: number;
// }

interface DeliveredProductProps {
    delivery: DeliveryType;
    product: ProductDeliveryType;
}

export const DeliveredProduct = (props: DeliveredProductProps) => {
    // Si live point relais afficher
    // Sinon tous produits livré, pas possible de modifié et afficher "Livré"`
    // Sinon afficher la possibilité d'ajouter une produits livré puis save

    const { product, delivery } = props;

    const [manualQuantity, setmanualQuantity] = useState<number>(0);
    const [status, setStatus] = useState(false);

    // const [delivery, setDelivery] = useState<number>();

    // useEffect(() => {
    //     setQuantity(0);
    // }, []);

    if (!product.id) return <CircularProgress color="secondary" />;
    if (delivery.delivery_type === "Point_Relais") return <p>Livraison effeectué en point relais</p>;

    return (
        <Grid>
            <Typography>Quantité livré : {manualQuantity} </Typography>
            {product.quantity === manualQuantity ? (
                <RadioButtonCheckedIcon color="success" />
            ) : (
                <RadioButtonUncheckedIcon color="error" />
            )}
            <Button onClick={() => setmanualQuantity(manualQuantity + 1)}>+1</Button>
            <Button onClick={() => setmanualQuantity(manualQuantity - 1)}>-1</Button>
            <Button onClick={() => setmanualQuantity(product.quantity)}>Rendu Total</Button>
        </Grid>
    );
};
