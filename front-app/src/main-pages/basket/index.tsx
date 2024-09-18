import React, { useEffect, useState } from "react";
import { productsDetails, ProductsDetailsType } from "../../common/assets/products/products-details";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ListBasketType } from "../tarification";
import { PAID_FREQUENCY } from "../../common/component/inputs";

interface BasketDetailsType {
    product: ProductsDetailsType;
    frequency: PAID_FREQUENCY;
}

export const Basket = () => {
    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
    const [listProducts, setListProducts] = useState<BasketDetailsType[]>([]);

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

    useEffect(() => {
        loadBasketFromStorage();
    }, []);

    return (
        <Grid>
            {listProducts.length > 0 ? (
                <Grid>
                    {listProducts.map((product, index) => (
                        <Grid key={index}>
                            <Typography>{product.product.class}</Typography>
                            <Typography>{product.frequency}</Typography>
                            <Button onClick={() => handleDeleteProduct(index)}>Delete unit</Button>
                        </Grid>
                    ))}
                    <Button onClick={handleClearAll}>Clear all</Button>
                </Grid>
            ) : (
                <Typography>Votre panier est vide pour le moment</Typography>
            )}
        </Grid>
    );
};
