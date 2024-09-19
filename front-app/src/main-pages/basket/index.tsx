import React, { useEffect, useState } from "react";
import { productsDetails, ProductsDetailsType } from "../../common/assets/products/products-details";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ListBasketType } from "../tarification";
import { PAID_FREQUENCY } from "../../common/component/inputs";
import CloseIcon from "@mui/icons-material/Close";
import { mounthToAnnual } from "../../common/utils/pricing";

interface BasketDetailsType {
    product: ProductsDetailsType;
    frequency: PAID_FREQUENCY;
}

export const Basket = () => {
    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
    const [listProducts, setListProducts] = useState<BasketDetailsType[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const loadBasketFromStorage = () => {
        const storedBasket = localStorage.getItem("basket");
        if (storedBasket) {
            const basketItems = JSON.parse(storedBasket);
            setListBasket(basketItems);
            const updatedListProducts = basketItems.map((item: ListBasketType) => ({
                product: productsDetails.find((prod) => prod.id === item.productId)!,
                frequency: item.paidFrequency,
            }));
            setListProducts(updatedListProducts);
        }
    };

    const handleClearAll = () => {
        setListBasket([]);
        setListProducts([]);
        localStorage.removeItem("basket");
    };

    const handleDeleteProduct = (index: number) => {
        const updatedBasket = listBasket.filter((_, i) => i !== index);
        setListBasket(updatedBasket);
        setListProducts(
            updatedBasket.map((item) => ({
                product: productsDetails.find((prod) => prod.id === item.productId)!,
                frequency: item.paidFrequency,
            })),
        );
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
    };

    // Calculer le prix total à chaque changement de listProducts
    useEffect(() => {
        const newTotal = listProducts.reduce((acc, prod) => {
            const productPrice =
                prod.frequency === PAID_FREQUENCY.YEAR
                    ? mounthToAnnual(prod.product.price_mounth)
                    : prod.product.price_mounth;
            return acc + productPrice;
        }, 0);
        setTotalPrice(newTotal);
    }, [listProducts]);

    // Charger le panier depuis le localStorage une fois au chargement du composant
    useEffect(() => {
        loadBasketFromStorage();
    }, []);

    return (
        <Grid>
            {listProducts.length > 0 ? (
                <Grid>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid border={"2px solid #E7E6F6"} borderRadius="14px">
                            {listProducts.map((product, index) => (
                                <Grid container key={index} spacing={2} alignItems="center">
                                    <img
                                        width={60}
                                        src={`${process.env.PUBLIC_URL}/assets/products/${product.product.picture_url}`}
                                        alt="Favicon"
                                    />

                                    <Typography>{product.product.class}</Typography>
                                    <Typography>{product.frequency}</Typography>
                                    <Typography>
                                        {product.frequency === PAID_FREQUENCY.MONTH
                                            ? product.product.price_mounth
                                            : mounthToAnnual(product.product.price_mounth)}{" "}
                                        €
                                    </Typography>

                                    <Button onClick={() => handleDeleteProduct(index)}>
                                        <CloseIcon />
                                    </Button>
                                </Grid>
                            ))}
                            <Button onClick={handleClearAll}>Clear All</Button>
                        </Grid>

                        <Grid border={"2px solid #E7E6F6"} borderRadius="14px">
                            <Typography>Total Ttc : {totalPrice}</Typography>
                            {/*Creer methode pour avoir ht*/}
                            <Typography> Ht : {totalPrice - totalPrice * 0.2}</Typography>
                            {/*Creer methode pour avoir Tva*/}
                            <Typography> Tva : {totalPrice * 0.2}</Typography>

                            <Button>Paiement</Button>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Typography>Votre panier est vide pour le moment</Typography>
            )}
        </Grid>
    );
};
