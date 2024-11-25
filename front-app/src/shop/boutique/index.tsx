import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import { ProductEntity } from "./type";
import { CardProductService } from "./component";
import { Typography } from "@mui/material";
import { PAID_FREQUENCY, TYPE_PRODUCT } from "./const";
import {getProduct} from "../vitrine/request";

export interface ListBasketType {
    productId: number;
    paidFrequency: PAID_FREQUENCY;
}

export const BoutiquePage = () => {
    const [listProducts, setListProducts] = useState<ProductEntity[]>();

    const [products, setProducts] = useState<ProductEntity[] | undefined>(undefined);
    const [services, setService] = useState<ProductEntity[] | undefined>(undefined);

    useEffect(() => {
        getProduct().then(setListProducts);
        if (listProducts) {
            setProducts(listProducts.filter((p: ProductEntity) => p.type === TYPE_PRODUCT.PRODUCT));
            setService(listProducts.filter((p: ProductEntity) => p.type === TYPE_PRODUCT.SERVICE));
        }
    }, [listProducts, setService, setProducts]);

    return (
        <Grid container mt={2} display="flex" flexDirection="column" alignContent="center" justifyContent="center">
            {services && services.length > 0 && <CardProductService products={services} />}
            {products && products.length > 0 && <CardProductService products={products} />}
            {!products && <Typography>Aucun produits pour le moment</Typography>}
        </Grid>
    );
};
