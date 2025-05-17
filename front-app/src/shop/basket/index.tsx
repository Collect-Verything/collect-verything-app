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
import { Button, InputLabel, SelectChangeEvent } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ButtonRounded } from "../component/buttons";
import Grid from "@mui/material/Grid";
import { PaiementCard } from "./paiement";
import { useAppDispatch } from "../../features/authentication-slice";
import { deleteAllBasketItems, deleteBasketItem, getBasket } from "../../features/basket-slice";
import { useSelector } from "react-redux";
import { PAYMENT_FREQUENCY } from "../../common/const/payment-frequency";
import { PRODUCT_TYPE } from "../../common/const/product";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { DELIVERY_TYPE } from "../../common/const/delivery";
import { DisplayCountItemBasket, NoItemBasket, PickUpMap, PickUpShop } from "./components";

export const Basket = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useAppDispatch();
    const { list } = useSelector(getBasket);

    const [containProduct, setContainProduct] = useState(false);
    const [deliveryConfigured, setDeliveryConfigured] = useState(false);
    const [deliveryView, setDeliveryView] = useState(false);

    const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPE.POINT_RELAIS);

    const handleChangeDeliveryType = (event: SelectChangeEvent) => {
        setDeliveryType(event.target.value as DELIVERY_TYPE);
    };

    const handleDelivery = () => {
        setDeliveryConfigured(false);
        const element = document.getElementById("basket");
        element?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const newTotal = list.reduce((acc, prod) => {
            const productPrice =
                prod.paidFrequency === PAYMENT_FREQUENCY.YEAR ? mounthToAnnual(prod.product.price) : prod.product.price;
            return acc + productPrice;
        }, 0);
        setTotalPrice(newTotal);
    }, [list]);

    useEffect(() => {
        list.map((item) => {
            if (item.product.type === PRODUCT_TYPE.PRODUCT) {
                setContainProduct(true);
                setDeliveryConfigured(true);
            } else {
                setContainProduct(false);
                setDeliveryConfigured(false);
                setDeliveryView(false);
            }
            if (item.product.type !== PRODUCT_TYPE.PRODUCT) {
                setDeliveryView(false);
            }
        });
    }, [list]);

    if (!totalPrice) return <NoItemBasket />;

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "white" }} id="basket">
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
                                            <DisplayCountItemBasket list={list} />
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
                                    <PaiementCard
                                        setDeliveryView={setDeliveryView}
                                        deliveryConfigured={deliveryConfigured}
                                        containProduct={containProduct}
                                        totalPrice={totalPrice}
                                        listBasket={list}
                                    />
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            {deliveryView && (
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
                                                        <MDBIcon /> Votre livraison
                                                    </MDBTypography>
                                                </Grid>
                                            </Grid>

                                            <div className="d-flex flex-row align-items-center">
                                                <div>Recuperer votre colis en :</div>
                                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                    <InputLabel id="demo-select-small-label">Livraison</InputLabel>
                                                    <Select
                                                        value={deliveryType}
                                                        label="Type Livraison"
                                                        onChange={handleChangeDeliveryType}
                                                    >
                                                        <MenuItem value={DELIVERY_TYPE.MAGASIN}>
                                                            {DELIVERY_TYPE.MAGASIN}
                                                        </MenuItem>
                                                        <MenuItem value={DELIVERY_TYPE.POINT_RELAIS}>
                                                            {DELIVERY_TYPE.POINT_RELAIS}
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <Grid>
                                                {deliveryType === DELIVERY_TYPE.POINT_RELAIS ? (
                                                    <PickUpMap handleDelivery={handleDelivery} />
                                                ) : (
                                                    <PickUpShop handleDelivery={handleDelivery} />
                                                )}
                                            </Grid>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            )}
            <Grid id="delivery"></Grid>
        </section>
    );
};
