import { MDBBtn, MDBCardBody, MDBCardImage, MDBCol, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { getHt, getTva, sanitizePrice } from "../../../common/utils/pricing";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { ListBasketType } from "../../boutique/type";
import { PRODUCT_TYPE } from "../../../common/const/product";
import { updateStockById } from "./request";
import { StockAndID } from "./type";
import { useSelector } from "react-redux";
import { URL_FRONT } from "../../../app/router/const";

interface PaiementCardProps {
    backgroundColor: string;
    totalPrice: number;
    listBasket: ListBasketType[];
}

export const PaiementCard = (props: PaiementCardProps) => {
    const { role } = useSelector((store: any) => store.authenticate);
    const { backgroundColor, totalPrice, listBasket } = props;

    const [statusPaiement, setStatusPaiement] = useState<boolean>(false);
    const [statusButtonPaiement, setStatusButtonPaiement] = useState<boolean>(false);
    const [groupStockId, setGroupStockId] = useState<StockAndID[]>([]);

    const handlePayement = () => {
        setStatusButtonPaiement(true);

        setTimeout(() => {
            console.log("Simulation paiement");
            setStatusPaiement(true);
            setStatusButtonPaiement(false);
            localStorage.removeItem("basket");
        }, 2000);

        updateStockById(groupStockId).catch(console.error);
    };

    useEffect(() => {
        const cleanList: StockAndID[] = [];
        const groupListProduct: StockAndID[] = [];

        listBasket.forEach((item) => {
            if (item.product.type === PRODUCT_TYPE.PRODUCT) {
                const existingStockIndex = cleanList.findIndex((stock) => stock.id === item.product.id);
                if (existingStockIndex !== -1) {
                    cleanList[existingStockIndex].quantity += 1;
                } else {
                    cleanList.push({ id: item.product.id, quantity: 1 });
                }
            }
        });

        cleanList.forEach((item) => {
            const existingGroupIndex = groupListProduct.findIndex((groupItem) => groupItem.id === item.id);
            if (existingGroupIndex !== -1) {
                groupListProduct[existingGroupIndex].quantity += item.quantity;
            } else {
                groupListProduct.push({ id: item.id, quantity: item.quantity });
            }
        });

        setGroupStockId(groupListProduct);
    }, [listBasket]);

    return (
        <MDBCol lg="5">
            <Grid
                height="100%"
                className="text-white rounded-3"
                style={statusPaiement ? { color: "green" } : { backgroundColor }}
            >
                {role &&
                    (statusPaiement ? (
                        <Grid margin="auto" textAlign="center" spacing={2} mb={16} mt={15}>
                            <DoneOutlineIcon color="success" />
                            <Typography color="textPrimary">Paiement validé</Typography>
                        </Grid>
                    ) : (
                        <MDBCardBody>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <MDBTypography tag="h5" className="mb-0">
                                    Paiement
                                </MDBTypography>
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                    fluid
                                    className="rounded-3"
                                    style={{ width: "45px" }}
                                    alt="Avatar"
                                />
                            </div>

                            <p className="small">Card type</p>
                            <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                            <MDBIcon fab icon="cc-visa fa-2x me-2" />
                            <MDBIcon fab icon="cc-amex fa-2x me-2" />
                            <MDBIcon fab icon="cc-paypal fa-2x me-2" />

                            <form className="mt-4">
                                <MDBInput
                                    className="mb-4"
                                    label="Cardholder's Name"
                                    type="text"
                                    size="lg"
                                    placeholder="Cardholder's Name"
                                    contrast
                                />

                                <MDBInput
                                    className="mb-4"
                                    label="Card Number"
                                    type="text"
                                    size="lg"
                                    minLength={19}
                                    maxLength={19}
                                    placeholder="1234 5678 9012 3457"
                                    contrast
                                />

                                <MDBRow className="mb-4">
                                    <MDBCol md="6">
                                        <MDBInput
                                            className="mb-4"
                                            label="Expiration"
                                            type="text"
                                            size="lg"
                                            minLength={7}
                                            maxLength={7}
                                            placeholder="MM/YYYY"
                                            contrast
                                        />
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <MDBInput
                                            className="mb-4"
                                            label="Cvv"
                                            type="text"
                                            size="lg"
                                            minLength={3}
                                            maxLength={3}
                                            placeholder="&#9679;&#9679;&#9679;"
                                            contrast
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </form>

                            <hr />

                            <div className="d-flex justify-content-between">
                                <p className="mb-2">Hors Taxe</p>
                                <p className="mb-2">{sanitizePrice(getHt(totalPrice))}</p>
                            </div>

                            <div className="d-flex justify-content-between">
                                <p className="mb-2">TVA</p>
                                <p className="mb-2">{sanitizePrice(getTva(totalPrice))}</p>
                            </div>

                            <div className="d-flex justify-content-between">
                                <p className="mb-2">Shipping</p>
                                <p className="mb-2">0.00 €</p>
                            </div>

                            <MDBBtn color="dark" block size="lg">
                                {statusButtonPaiement ? (
                                    <CircularProgress />
                                ) : (
                                    <div className="d-flex justify-content-between" onClick={handlePayement}>
                                        <span>{sanitizePrice(totalPrice)}</span>
                                        <span>
                                            PAYER
                                            <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                        </span>
                                    </div>
                                )}
                            </MDBBtn>
                        </MDBCardBody>
                    ))}

                {!role && (
                    <Grid
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <Grid>
                            <Button href={URL_FRONT.LOGIN} variant="contained">
                                Login
                            </Button>
                        </Grid>
                        <Grid paddingTop={5}>
                            <Button href={URL_FRONT.REGISTER} variant="contained" color="primary">
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </MDBCol>
    );
};
