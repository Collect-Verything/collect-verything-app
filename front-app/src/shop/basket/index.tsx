import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { mounthToAnnual, sanitizePrice } from "../../common/utils/pricing";
import { PRIMARY_DARKER_COLOR } from "../../common/styles/theme";
import { Button, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ButtonRounded } from "../component/buttons";
import Grid from "@mui/material/Grid2";
import { PaiementCard } from "./paiement";
import { useAppDispatch } from "../../features/authentication-slice";
import { deleteAllBasketItems, deleteBasketItem, getBasket } from "../../features/basket-slice";
import { useSelector } from "react-redux";
import { PAYMENT_FREQUENCY } from "../../common/const/payment-frequency";

export const Basket = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useAppDispatch();
    const { list } = useSelector(getBasket);

    useEffect(() => {
        const newTotal = list.reduce((acc, prod) => {
            const productPrice =
                prod.paidFrequency === PAYMENT_FREQUENCY.YEAR ? mounthToAnnual(prod.product.price) : prod.product.price;
            return acc + productPrice;
        }, 0);
        setTotalPrice(newTotal);
    }, [list]);

    if (!totalPrice)
        return (
            <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: "50vh" }}>
                <Typography variant="h3" color="textSecondary">
                    Aucun article dans votre panier
                </Typography>
            </Grid>
        );

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "white" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody className="p-4">
                                <MDBRow>
                                    <MDBCol lg="7">
                                        <Grid container justifyContent="space-between">
                                            <Grid>
                                                <MDBTypography tag="h5">
                                                    <MDBIcon /> Panier
                                                </MDBTypography>
                                            </Grid>
                                            {list.length > 0 && (
                                                <Grid>
                                                    <div>
                                                        <p>
                                                            <ButtonRounded
                                                                bgColor={PRIMARY_DARKER_COLOR}
                                                                label="Vider le panier"
                                                                handleFx={() => dispatch(deleteAllBasketItems())}
                                                            />
                                                        </p>
                                                    </div>
                                                </Grid>
                                            )}
                                        </Grid>

                                        <hr />

                                        {list.length === 0 ? (
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p className="mb-0">
                                                        Vous possedez actuellement {list.length} article(s) dans votre
                                                        panier.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                                {list.map((item, index) => (
                                                    <MDBCard className="mb-3" key={index}>
                                                        <MDBCardBody>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div>
                                                                        <MDBCardImage
                                                                            src={`${process.env.PUBLIC_URL}/assets/products/${item.product.picture_path}`}
                                                                            fluid
                                                                            className="rounded-3"
                                                                            style={{ width: "200px" }}
                                                                            alt="Shopping item"
                                                                        />
                                                                    </div>
                                                                    <div className="ms-3">
                                                                        <MDBTypography tag="h5">
                                                                            {item.product.title}
                                                                        </MDBTypography>
                                                                        <p className="small mb-0">
                                                                            {item.product.description}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div style={{ width: "100px" }}>
                                                                        <MDBTypography
                                                                            tag="h5"
                                                                            className="fw-normal mb-0"
                                                                        >
                                                                            {item.paidFrequency}
                                                                        </MDBTypography>
                                                                    </div>
                                                                    <div style={{ width: "100px" }}>
                                                                        <MDBTypography tag="h5" className="mb-0">
                                                                            {item.paidFrequency ===
                                                                            PAYMENT_FREQUENCY.YEAR
                                                                                ? sanitizePrice(
                                                                                      mounthToAnnual(
                                                                                          item.product.price,
                                                                                      ),
                                                                                  )
                                                                                : sanitizePrice(item.product.price)}
                                                                        </MDBTypography>
                                                                    </div>
                                                                    <Button
                                                                        onClick={() =>
                                                                            dispatch(deleteBasketItem(index))
                                                                        }
                                                                    >
                                                                        <DeleteOutlineIcon
                                                                            sx={{ color: `${PRIMARY_DARKER_COLOR}` }}
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                ))}
                                            </div>
                                        )}
                                    </MDBCol>
                                    <PaiementCard totalPrice={totalPrice} listBasket={list} />
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};
