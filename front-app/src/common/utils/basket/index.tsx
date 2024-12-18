import { ProductEntity } from "../../../shop/boutique/type";
import React, { useEffect, useState } from "react";
import { Button, Switch, TextField, Typography } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { PAID_FREQUENCY, TYPE_PRODUCT } from "../../../shop/boutique/const";
import Grid from "@mui/material/Grid2";
import { mounthToAnnual } from "../pricing";
import { PRODUCT_TYPE } from "../../const/product";

const handleSetStorage = (product: ProductEntity, paidFrequency: PAID_FREQUENCY, quantity: number) => {
    const existingBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    const newItems = Array.from({ length: quantity }, () => ({ product, paidFrequency }));
    const updatedBasket = [...existingBasket, ...newItems];
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
};

interface SwitchRoundedWithPriceProps {
    price: number;
    mb?: number;
    mt?: number;
    p: ProductEntity;
    products: ProductEntity[];
}

export const SwitchPriceToBasket = ({ price, mt = 0, mb = 0, p, products }: SwitchRoundedWithPriceProps) => {
    const [checked, setChecked] = React.useState(true);
    const [paidFrequency, setPaidFrequency] = useState<PAID_FREQUENCY>(PAID_FREQUENCY.YEAR);
    const [quantity, setQuantity] = useState(1);

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
                <>
                    <Typography>{p.price} €</Typography>
                    {p.stock !== 0 && (
                        <TextField
                            id="standard-basic"
                            label="Quantité"
                            variant="standard"
                            type="number"
                            value={quantity}
                            InputProps={{ inputProps: { min: 1, max: p.stock } }}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    )}
                </>
            )}
            <Grid>
                {p.stock === 0 && p.type === PRODUCT_TYPE.PRODUCT ? (
                    <Typography>Hors Stock</Typography>
                ) : (
                    <Button
                        sx={{ color: "black" }}
                        onClick={() =>
                            handleSetStorage(
                                p,
                                products[0].type === TYPE_PRODUCT.SERVICE ? paidFrequency : PAID_FREQUENCY.UNIT,
                                quantity,
                            )
                        }
                    >
                        <LocalMallIcon />
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};
