import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PRIMARY_COLOR } from "../../common/styles/theme";
import React from "react";
import { ProductEntity } from "./type";
import { TYPE_PRODUCT } from "./const";
import { useNavigate } from "react-router-dom";
import { URL_FRONT } from "../../app/router/const";
import { SwitchPriceToBasket } from "../../common/utils/basket";

interface CardProductServiceProps {
    products: ProductEntity[];
}

// TODO : Clean basket logic and quantity

export const CardProductService = (props: CardProductServiceProps) => {
    const { products } = props;

    return (
        <Grid>
            <Grid margin="auto" textAlign="center" mb={3} mt={5}>
                <Typography variant="h3">
                    {products[0].type === TYPE_PRODUCT.SERVICE ? "Nos services" : "Nos Produits"}
                </Typography>
            </Grid>

            <Grid container>
                {products.map((p) => (
                    <Grid
                        sx={{
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                boxShadow: "10px 5px 5px rgba(0, 0, 0, .1)",
                                transition: "all 0.3s ease-in-out",
                            },
                        }}
                        key={p.id}
                        textAlign="center"
                        style={{ border: `3px solid ${PRIMARY_COLOR}` }}
                        width="20%"
                        padding="20px 20px 20px 20px"
                        borderRadius="15px"
                        marginTop="-2px"
                        alignContent="center"
                        justifyContent="center"
                        marginLeft={2}
                        marginRight={2}
                        margin="auto"
                        height="500px"
                    >
                        <ButtonProductCard idProduct={p.id}>
                            <Typography textAlign="center" color="textPrimary">
                                {p.name}
                            </Typography>
                        </ButtonProductCard>

                        <ButtonProductCard idProduct={p.id}>
                            <Typography variant="h4" color="textPrimary" mt={3} mb={2}>
                                {p.title}
                            </Typography>
                        </ButtonProductCard>
                        <Typography variant="subtitle2">{p.description}</Typography>

                        <SwitchPriceToBasket products={products} price={p.price} p={p} mt={3} mb={3} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

interface ButtonProductCardProps {
    children: React.ReactNode;
    idProduct: number;
}

export const ButtonProductCard = (props: ButtonProductCardProps) => {
    const { children, idProduct } = props;
    const nav = useNavigate();

    return <Button onClick={() => nav(`/${URL_FRONT.DETAILS}?id=${idProduct}`)}>{children}</Button>;
};
