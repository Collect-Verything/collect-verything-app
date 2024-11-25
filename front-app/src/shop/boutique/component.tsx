import { Button, Switch, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PRIMARY_COLOR } from "../../common/styles/theme";
import React, { useEffect, useState } from "react";
import { ProductEntity } from "./type";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { ListBasketType } from "./index";
import { mounthToAnnual } from "../../common/utils/pricing";
import { PAID_FREQUENCY, TYPE_PRODUCT } from "./const";

interface CardProductServiceProps {
    products: ProductEntity[];
}

// TODO : Regler probleme d'etat des paid frequency sur les boutton switch impacté dans le composant :SwitchRoundedWithPrice
// Probleme d'etat ..., ajouter au panier month et annuel et checker le localstorage pour comprendre probleme etat mensuel annule
// Doublon setPaidFrequency dans children ....

export const CardProductService = (props: CardProductServiceProps) => {
    const { products } = props;

    const [paidFrequency, setPaidFrequency] = useState<PAID_FREQUENCY>(PAID_FREQUENCY.YEAR);
    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);

    const handleSetStorage = (productId: number, paidFrequency: PAID_FREQUENCY) => {
        const updatedBasket = [...listBasket, { productId, paidFrequency }];
        setListBasket(updatedBasket);
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
    };

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

                        {p.type === TYPE_PRODUCT.SERVICE ? (
                            <SwitchRoundedWithPrice
                                price={p.price}
                                frequency={paidFrequency}
                                // setPaidFrequency={setPaidFrequency}
                                mb={3}
                                mt={3}
                            />
                        ) : (
                            <Typography>{p.price} €</Typography>
                        )}
                        <Grid>
                            <Button
                                sx={{ color: "black" }}
                                onClick={() =>
                                    handleSetStorage(
                                        p.id,
                                        products[0].type === TYPE_PRODUCT.SERVICE ? paidFrequency : PAID_FREQUENCY.UNIT,
                                    )
                                }
                            >
                                <LocalMallIcon />
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

interface SwitchRoundedWithPriceProps {
    price: number;
    frequency: PAID_FREQUENCY;
    mb?: number;
    mt?: number;
}

const SwitchRoundedWithPrice = ({ price, frequency, mt = 0, mb = 0 }: SwitchRoundedWithPriceProps) => {
    const [checked, setChecked] = React.useState(true);

    const [paidFrequency, setPaidFrequency] = React.useState<PAID_FREQUENCY>(PAID_FREQUENCY.YEAR);

    useEffect(() => {
        setPaidFrequency(frequency);
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
    );
};
