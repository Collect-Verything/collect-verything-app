import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { ListBasketType } from "../boutique/type";
import { getHt, getTva, mounthToAnnual, sanitizePrice } from "../../common/utils/pricing";
import { PRIMARY_DARKER_COLOR } from "../../common/styles/theme";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ButtonRounded } from "../../common/component/buttons";
import { PAID_FREQUENCY } from "../boutique/const";
import Grid from "@mui/material/Grid2";

const backgroundColor = PRIMARY_DARKER_COLOR;

export const Basket = () => {
    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
    // const [listProducts, setListProducts] = useState<BasketDetailsType[]>([]);
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
        // setListProducts([]);
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

                                    <MDBCol lg="5">
                                        <MDBCard className="text-white rounded-3" style={{ backgroundColor }}>
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
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-visa fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-amex fa-2x me-2" />
                                                </a>
                                                <a href="#!" type="submit" className="text-white">
                                                    <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                                                </a>

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
                                                    <div className="d-flex justify-content-between">
                                                        <span>{sanitizePrice(totalPrice)}</span>
                                                        <span>
                                                            PAYER
                                                            <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                                        </span>
                                                    </div>
                                                </MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};
