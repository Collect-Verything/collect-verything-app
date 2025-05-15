import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { PRIMARY_COLOR } from "../../common/styles/theme";
import React from "react";
import { ProductEntity } from "./type";
import { useNavigate } from "react-router-dom";
import { SwitchPriceToBasket } from "../../common/utils/basket";
import { PATH_NAME } from "../../common/const/path";
import { PRODUCT_TYPE } from "../../common/const/product";

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
                    {products[0].type === PRODUCT_TYPE.SERVICE ? "Nos services" : "Nos Produits"}
                </Typography>
            </Grid>
            <Grid container spacing={6} mt="5vh" pt={5}>
                {products.map((p) => (
                    <Grid
                        key={p.id}
                        sx={{
                            width: "280px",
                            position: "relative",
                            borderRadius: "14px",
                            background: "white",
                            zIndex: 1,
                            transition: "0.3s",
                            textAlign: "left",
                            border: `1px solid ${PRIMARY_COLOR}`,
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                            "&:before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: "14px",
                                padding: "2px",
                                background: `linear-gradient( ${PRIMARY_COLOR}, silver)`,
                                "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                maskComposite: "exclude",
                                zIndex: -1,
                            },
                            "&:hover": {
                                transform: "scale(1.05)",
                                transition: "0.3s",
                                cursor: "pointer",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                            },
                        }}
                    >
                        <Grid spacing={2} padding={2} pt={5} pb={5} textAlign="center">
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
                            <ButtonProductCard idProduct={p.id}>
                                <Typography variant="subtitle2">{p.description}</Typography>
                            </ButtonProductCard>

                            <SwitchPriceToBasket products={products} price={p.price} p={p} mt={3} mb={3} />
                        </Grid>
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

    return <Grid onClick={() => nav(`/${PATH_NAME.DETAILS}?id=${idProduct}`)}>{children}</Grid>;
};
