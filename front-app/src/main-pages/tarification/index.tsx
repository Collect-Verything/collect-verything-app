import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PAID_FREQUENCY, SwitchRoundedWithPrice } from "../../common/component/inputs";
import { ButtonRounded } from "../../common/component/buttons";
import { poductsDetails } from "../../common/assets/products/poducts-details";
import { Link } from "react-router-dom";

export const Tarification = () => {
    const [selected, setSelected] = useState<number>(2);
    const [solutions, setSolutions] = useState(poductsDetails);
    const [paidFrequency, setPaidFrequency] = useState<PAID_FREQUENCY>(PAID_FREQUENCY.YEAR);
    const [basketStorage, setBasketStorage] = useState<boolean>();

    const handleSetStorage = (key: string, selected: number, paidFrequency: PAID_FREQUENCY) => {
        setBasketStorage(true);
        localStorage.setItem("basket", `${selected}-${paidFrequency}`);
    };

    useEffect(() => {
        const userStorage = localStorage.getItem("basket");
        if (userStorage) {
            setBasketStorage(true);
        } else {
            setBasketStorage(false);
        }
    }, []);

    return (
        <Grid container mt={10} display="flex" flexDirection="column" alignContent="center" justifyContent="center">
            <Grid container alignContent="center" justifyContent="center" sx={{ "&:hover": { cursor: "pointer" } }}>
                <Grid
                    width="33%"
                    height="30px"
                    onClick={() => setSelected(1)}
                    sx={{
                        background: selected === 1 ? "linear-gradient(to bottom, white, #E7E6F6)" : "",
                        borderRadius: "30px 0px 0px 5px",
                    }}
                >
                    <Typography fontWeight={selected === 1 ? 600 : 0} textAlign="center">
                        Regular
                    </Typography>
                </Grid>
                <Grid
                    width="34%"
                    height="30px"
                    onClick={() => setSelected(2)}
                    sx={{
                        background: selected === 2 ? "linear-gradient(to bottom, white, #E7E6F6)" : "",
                    }}
                    borderRadius="0px 0px 0px 0px"
                >
                    <Typography fontWeight={selected === 2 ? 600 : 0} textAlign="center">
                        Medium
                    </Typography>
                </Grid>
                <Grid
                    width="33%"
                    height="30px"
                    onClick={() => setSelected(3)}
                    sx={{
                        background: selected === 3 ? "linear-gradient(to bottom, white, #E7E6F6)" : "",
                    }}
                    borderRadius="0px 30px 5px 0px"
                >
                    <Typography fontWeight={selected === 3 ? 600 : 0} textAlign="center">
                        Premium
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                textAlign="center"
                border="3px solid #E7E6F6"
                width="45%"
                padding="20px 20px 20px 20px"
                borderRadius="0px 0px 10px 10px"
                marginTop="-2px"
                alignContent="center"
                justifyContent="center"
            >
                <Typography variant="h4" mt={3} mb={2}>
                    {solutions[selected - 1].title}
                </Typography>
                <Typography variant="subtitle2">{solutions[selected - 1].description}</Typography>

                <SwitchRoundedWithPrice
                    price={solutions[selected - 1].price_mounth}
                    paidFrequency={paidFrequency}
                    setPaidFrequency={setPaidFrequency}
                    mb={3}
                    mt={3}
                />

                {solutions[selected - 1].details.map((detail, index) => (
                    <Typography key={index} variant="subtitle2">
                        {detail}
                    </Typography>
                ))}
                <Grid onClick={() => handleSetStorage("basket", selected, paidFrequency)}>
                    <ButtonRounded mt={3} mb={4} label={"Ajouter au panier"} />
                </Grid>

                {basketStorage && (
                    <Link to="/basket">
                        <ButtonRounded mb={4} label={"Consulter votre panier"} bgColor="white" txtColor="black" />
                    </Link>
                )}
            </Grid>
        </Grid>
    );
};
