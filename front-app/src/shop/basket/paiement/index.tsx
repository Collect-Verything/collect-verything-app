import { MDBBtn, MDBCardBody, MDBCardImage, MDBCol, MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { getHt, getTva, sanitizePrice } from "../../../common/utils/pricing";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ListBasketType } from "../../boutique/type";
import { PRODUCT_TYPE } from "../../../common/const/product";
import { updateStockById } from "./request";
import { StockAndID } from "./type";
import { useSelector } from "react-redux";
import { PRIMARY_DARKER_COLOR } from "../../../common/styles/theme";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../features/store";
import { PATH_NAME } from "../../../common/const/path";

interface PaiementCardProps {
    totalPrice: number;
    listBasket: ListBasketType[];
}

const backgroundColor = PRIMARY_DARKER_COLOR;

export const PaiementCard = (props: PaiementCardProps) => {
    const { totalPrice, listBasket } = props;
    const { role } = useSelector((store: RootState) => store.authenticate);

    const nav = useNavigate();
    const [groupStockId, setGroupStockId] = useState<StockAndID[]>([]);

    const handlePaymentPageRedirect = () => {
        nav(`/${PATH_NAME.CHECK_USER_STRIPE_ID}`);

        // TODO : Local Sotrage + Update sotck
        // Cette methode de mise a jour devrait etre fait à la confimartion de paiement suite a webhook strip ou alors à la confirmation dans le front
        // Effacer local storage
        // Mettre a jour le stock produits service , ou alors webhook ?
        // ICI ----------------
        updateStockById(groupStockId).catch(console.error);
        // ICI ----------------
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
                container
                alignItems="center"
                justifyContent="center"
                className="text-white rounded-3"
                bgcolor={backgroundColor}
                height="100%"
            >
                {role && (
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

                        <p className="small">Type de carte disponible</p>
                        <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                        <MDBIcon fab icon="cc-visa fa-2x me-2" />
                        <MDBIcon fab icon="cc-amex fa-2x me-2" />
                        <MDBIcon fab icon="cc-paypal fa-2x me-2" />

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
                            {/*TODO : Redirection sur la page stripe de paiement*/}
                            <div className="d-flex justify-content-between" onClick={handlePaymentPageRedirect}>
                                <span>{sanitizePrice(totalPrice)}</span>
                                <span>
                                    PAYER
                                    <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                </span>
                            </div>
                        </MDBBtn>
                    </MDBCardBody>
                )}

                {!role && (
                    <Grid
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <Grid>
                            <Button href={PATH_NAME.LOGIN} variant="contained">
                                Login
                            </Button>
                        </Grid>
                        <Grid paddingTop={5}>
                            <Button href={PATH_NAME.REGISTER} variant="contained" color="primary">
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </MDBCol>
    );
};
