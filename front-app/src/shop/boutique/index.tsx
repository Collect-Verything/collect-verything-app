import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import { ProductEntity } from "./type";
import { CardProductService } from "./component";
import { Typography } from "@mui/material";
import { TYPE_PRODUCT } from "./const";
import { getAllProducts } from "../vitrine/request";

export const BoutiquePage = () => {
    const [listProducts, setListProducts] = useState<ProductEntity[]>();

    const [products, setProducts] = useState<ProductEntity[] | undefined>(undefined);
    const [services, setService] = useState<ProductEntity[] | undefined>(undefined);

    useEffect(() => {
        getAllProducts().then(setListProducts);
    }, []);

    useEffect(() => {
        if (listProducts) {
            setProducts(listProducts.filter((p: ProductEntity) => p.type === TYPE_PRODUCT.PRODUCT));
            setService(listProducts.filter((p: ProductEntity) => p.type === TYPE_PRODUCT.SERVICE));
        }
    }, [listProducts]);

    return (
        <Grid
            container
            mt={2}
            display="flex"
            flexDirection="column"
            alignContent="center"
            justifyContent="space-around"
            spacing={3}
        >
            {services && services.length > 0 && <CardProductService products={services} />}
            {products && products.length > 0 && <CardProductService products={products} />}
            {!products && <Typography>Aucun produits pour le moment</Typography>}
        </Grid>
    );
};
