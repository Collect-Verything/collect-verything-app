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
import { ListBasketType } from "../boutique/type";
import { mounthToAnnual, sanitizePrice } from "../../common/utils/pricing";
import { PRIMARY_DARKER_COLOR } from "../../common/styles/theme";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ButtonRounded } from "../component/buttons";
import { PAID_FREQUENCY } from "../boutique/const";
import Grid from "@mui/material/Grid2";
import { PaiementCard } from "./paiement";

const backgroundColor = PRIMARY_DARKER_COLOR;

export const Basket = () => {
    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const loadBasketFromStorage = () => {
        const storedBasket = localStorage.getItem("basket");
        if (storedBasket) {
            const basketItems = JSON.parse(storedBasket);
            setListBasket(basketItems);
        }
    };

    const handleClearAll = () => {
        setListBasket([]);
        localStorage.removeItem("basket");
    };

    const handleDeleteProduct = (index: number) => {
        const updatedBasket = listBasket.filter((_, i) => i !== index);
        setListBasket(updatedBasket);
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
    };

    useEffect(() => {
        loadBasketFromStorage();
    }, []);

    useEffect(() => {
        const newTotal = listBasket.reduce((acc, prod) => {
            const productPrice =
                prod.paidFrequency === PAID_FREQUENCY.YEAR ? mounthToAnnual(prod.product.price) : prod.product.price;
            return acc + productPrice;
        }, 0);
        setTotalPrice(newTotal);
    }, [listBasket]);

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
                                                    <MDBIcon fas icon="long-arrow-alt-left me-2" /> Panier
                                                </MDBTypography>
                                            </Grid>
                                            {listBasket.length > 0 && (
                                                <Grid>
                                                    <div>
                                                        <p>
                                                            <ButtonRounded
                                                                bgColor={PRIMARY_DARKER_COLOR}
                                                                label="Vider le panier"
                                                                handleFx={handleClearAll}
                                                            />
                                                        </p>
                                                    </div>
                                                </Grid>
                                            )}
                                        </Grid>

                                        <hr />

                                        {listBasket.length === 0 ? (
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p className="mb-0">
                                                        Vous possedez actuellement {listBasket.length} article(s) dans
                                                        votre panier.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                                {listBasket.map((item, index) => (
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
                                                                            {item.paidFrequency === PAID_FREQUENCY.YEAR
                                                                                ? sanitizePrice(
                                                                                      mounthToAnnual(
                                                                                          item.product.price,
                                                                                      ),
                                                                                  )
                                                                                : sanitizePrice(item.product.price)}
                                                                        </MDBTypography>
                                                                    </div>
                                                                    <Button onClick={() => handleDeleteProduct(index)}>
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

                                    {/*TODO : Paiement card if connected*/}
                                    {/*TODO : If not connected by context auth, login or register*/}
                                    {/*TODO : If  connected by context auth, paiement*/}

                                    <PaiementCard
                                        backgroundColor={backgroundColor}
                                        totalPrice={totalPrice}
                                        listBasket={listBasket}
                                    />
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};
