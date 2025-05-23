import { ProductEntity } from "../../../shop/boutique/type";
import React, { useEffect, useState } from "react";
import { Button, Switch, TextField, Typography } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Grid from "@mui/material/Grid";
import { mounthToAnnual } from "../pricing";
import { PRODUCT_TYPE } from "../../const/product";
import { addBasketItems } from "../../../features/basket-slice";
import { useAppDispatch } from "../../../features/authentication-slice";
import { PAYMENT_FREQUENCY } from "../../const/payment-frequency";

interface SwitchRoundedWithPriceProps {
    price: number;
    mb?: number;
    mt?: number;
    p: ProductEntity;
    products: ProductEntity[];
}

export const SwitchPriceToBasket = ({ price, mt = 0, mb = 0, p, products }: SwitchRoundedWithPriceProps) => {
    const [checked, setChecked] = React.useState(true);
    const [paidFrequency, setPaidFrequency] = useState<PAYMENT_FREQUENCY>(PAYMENT_FREQUENCY.YEAR);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setPaidFrequency(paidFrequency);
    }, [paidFrequency]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (paidFrequency === PAYMENT_FREQUENCY.YEAR) {
            setPaidFrequency(PAYMENT_FREQUENCY.MONTH);
        } else {
            setPaidFrequency(PAYMENT_FREQUENCY.YEAR);
        }
    };

    return (
        <Grid>
            {p.type === PRODUCT_TYPE.SERVICE ? (
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
                <Grid pt={4}>
                    <Typography>{p.price} €</Typography>
                    {p.stock !== 0 && (
                        <Grid pb={3}>
                            <TextField
                                id="standard-basic"
                                label="Quantité"
                                variant="standard"
                                type="number"
                                value={quantity}
                                InputProps={{ inputProps: { min: 1, max: p.stock } }}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </Grid>
                    )}
                </Grid>
            )}
            <Grid>
                {p.stock === 0 && p.type === PRODUCT_TYPE.PRODUCT ? (
                    <Typography>Hors Stock</Typography>
                ) : (
                    <Button
                        sx={{ color: "black" }}
                        onClick={() =>
                            dispatch(
                                addBasketItems({
                                    product: p,
                                    paidFrequency:
                                        products[0].type === PRODUCT_TYPE.SERVICE
                                            ? paidFrequency
                                            : PAYMENT_FREQUENCY.UNIT,
                                    quantity,
                                }),
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
