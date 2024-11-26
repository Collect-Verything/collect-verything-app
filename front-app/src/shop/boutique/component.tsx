import { Button, Switch, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PRIMARY_COLOR } from "../../common/styles/theme";
import React, { useEffect, useState } from "react";
import { ListBasketType, ProductEntity } from "./type";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { mounthToAnnual } from "../../common/utils/pricing";
import { PAID_FREQUENCY, TYPE_PRODUCT } from "./const";

interface CardProductServiceProps {
    products: ProductEntity[];
}

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
                    >
                        <Typography textAlign="center">{p.name}</Typography>
                        <Typography variant="h4" mt={3} mb={2}>
                            {p.title}
                        </Typography>
                        <Typography variant="subtitle2">{p.description}</Typography>
                        <SwitchPriceToBasket products={products} price={p.price} p={p} mt={3} mb={3} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

interface SwitchRoundedWithPriceProps {
    price: number;
    mb?: number;
    mt?: number;
    p: ProductEntity;
    products: ProductEntity[];
}

const SwitchPriceToBasket = ({ price, mt = 0, mb = 0, p, products }: SwitchRoundedWithPriceProps) => {
    const [checked, setChecked] = React.useState(true);
    const [paidFrequency, setPaidFrequency] = useState<PAID_FREQUENCY>(PAID_FREQUENCY.YEAR);

    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);

    const handleSetStorage = (product: ProductEntity, paidFrequency: PAID_FREQUENCY) => {
        const existingBasket = JSON.parse(localStorage.getItem("basket") || "[]");
        const updatedBasket = [...existingBasket, { product, paidFrequency }];
        setListBasket(updatedBasket);
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
    };

    useEffect(() => {
        setPaidFrequency(paidFrequency);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (paidFrequency === PAID_FREQUENCY.YEAR) {
            setPaidFrequency(PAID_FREQUENCY.MONTH);
        } else {
            setPaidFrequency(PAID_FREQUENCY.YEAR);
        }
    };

    return (
        <Grid>
            {p.type === TYPE_PRODUCT.SERVICE ? (
                <Grid container alignItems="center" justifyContent="center" mb={mb} mt={mt}>
                    {checked ? (
                        <Typography textAlign="right" pt={1.7} pr={3} fontSize="0.8rem" variant="subtitle2">
                            {paidFrequency} {mounthToAnnual(price)}€ (éco 24 %)
                        </Typography>
                    ) : (
                        <Typography textAlign="left" pt={1.7} pl={6} fontSize="0.8rem" variant="subtitle2">
                            {paidFrequency} {price}€/mois
                        </Typography>
                    )}
                    <Switch checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
                </Grid>
            ) : (
                <Typography>{p.price} €</Typography>
            )}
            <Grid>
                <Button
                    sx={{ color: "black" }}
                    onClick={() =>
                        handleSetStorage(
                            p,
                            products[0].type === TYPE_PRODUCT.SERVICE ? paidFrequency : PAID_FREQUENCY.UNIT,
                        )
                    }
                >
                    <LocalMallIcon />
                </Button>
            </Grid>
        </Grid>
    );
};