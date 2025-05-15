import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductEntity } from "../boutique/type";
import { getProductById } from "./request";
import Grid from "@mui/material/Grid2";
import { PRIMARY_DARKER_COLOR } from "../../common/styles/theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, CardMedia, Typography } from "@mui/material";
import { SwitchPriceToBasket } from "../../common/utils/basket";
import { getAllProducts } from "../vitrine/request";
import { PATH_NAME } from "../../common/const/path";

export const DetailsProductPage = () => {
    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState<ProductEntity>();
    const nav = useNavigate();
    const idProduct = searchParams.get("id");
    const [listProducts, setListProducts] = useState<ProductEntity[]>();

    useEffect(() => {
        if (idProduct) {
            getProductById(Number(idProduct)).then(setProduct);
        }
    }, []);

    useEffect(() => {
        getAllProducts().then(setListProducts);
    }, []);

    if (!product) return null;

    return (
        <>
            <Grid marginTop={5} marginLeft={5}>
                <Button color="secondary" onClick={() => nav(`/${PATH_NAME.BOUTIQUE}`)}>
                    <ArrowBackIcon />
                </Button>
            </Grid>

            <Grid
                sx={{
                    padding: 5,
                    marginRight: 15,
                    marginLeft: 15,
                }}
                container
                justifyContent="space-around"
                alignItems="center"
            >
                {/*TODO : Get image url product*/}
                <Grid>
                    <CardMedia
                        component="img"
                        height="600"
                        src="https://images.unsplash.com/photo-1720048170996-40507a45c720?q=80&w=3413&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Paella dish"
                    />
                </Grid>
                <Grid>
                    <Grid
                        width="400px"
                        borderRadius="15px"
                        padding={5}
                        sx={{
                            border: `2px solid ${PRIMARY_DARKER_COLOR}`,
                        }}
                    >
                        <Typography variant="h5" component="div">
                            {product?.title}
                        </Typography>
                        <p>{product?.name}</p>
                        <p>Description : {product?.description}</p>
                        <Typography mt={2} variant="body1">
                            {product?.price} €
                        </Typography>
                        {product?.type === "PRODUCT" && (
                            <Typography variant="body1">Stock : {product?.stock}</Typography>
                        )}
                    </Grid>
                    <Grid textAlign="center" m={3}>
                        <SwitchPriceToBasket price={product?.price} products={listProducts!} p={product} />
                    </Grid>
                </Grid>
            </Grid>
            <Typography variant="body1">Details : {product?.details}</Typography>
        </>
    );
};
