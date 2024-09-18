import React, { useEffect, useState } from "react";
import { poductsDetails } from "../../common/assets/products/poducts-details";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const Basket = () => {
    const [productBasket, setProductBasket] = useState<any>();

    useEffect(() => {
        const userStorage = localStorage.getItem("basket");
        console.log(userStorage);
        if (userStorage) {
            const userDetails = userStorage.split("-");
            const articleNumber = Number(userDetails[0]);
            console.log(poductsDetails[articleNumber - 1]);
            setProductBasket(poductsDetails[articleNumber - 1]);
        }
    }, [productBasket]);

    return (
        <Grid>
            {productBasket ? <Typography>{productBasket.class}</Typography> : "Votre panier est vide pour le moment"}
        </Grid>
    );
};
